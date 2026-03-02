// app/api/navigation/route.js
import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db';
// import Node from '@/models/node.model';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();

    // Fetch all published nodes
    const nodes = await Node.find({ 
      status: 'published' 
    }).sort({ order: 1 }).lean();

    // Build tree structure
    const nodeMap = {};
    const rootNodes = [];
    
    // First pass: create map
    nodes.forEach(node => {
      nodeMap[node._id.toString()] = { ...node, children: [] };
    });
    
    // Second pass: build hierarchy
    nodes.forEach(node => {
      const nodeId = node._id.toString();
      const parentId = node.parentId ? node.parentId.toString() : null;
      
      if (parentId && nodeMap[parentId]) {
        nodeMap[parentId].children.push(nodeMap[nodeId]);
      } else {
        rootNodes.push(nodeMap[nodeId]);
      }
    });

    // Sort children by order
    const sortByOrder = (items) => {
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      items.forEach(item => {
        if (item.children?.length) {
          sortByOrder(item.children);
        }
      });
    };
    sortByOrder(rootNodes);

    // Group by category (you need to add category to your schema)
    // For now, we'll determine category from parent structure or add a default
    const medicalTopics = {
      sections: rootNodes.filter(n => n.type === 'section'),
      alphabetTopics: rootNodes.filter(n => n.type === 'page')
    };

    const resources = {
      columns: [
        {
          title: 'Clinical Tools',
          links: rootNodes.filter(n => n.type === 'group').map(n => ({
            title: n.title,
            slug: n.slug
          }))
        },
        {
          title: 'Multimedia',
          links: []
        }
      ]
    };

    const commentary = {
      articles: rootNodes
        .filter(n => n.type === 'article')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10)
        .map(article => ({
          title: article.title,
          slug: article.slug,
          date: article.createdAt,
          image: '/commentary/placeholder.jpg'
        }))
    };

    const procedures = {
      categories: rootNodes
        .filter(n => n.type === 'section')
        .map(category => ({
          title: category.title,
          slug: category.slug,
          image: `/procedures/${category.slug}.jpg`,
          items: category.children?.map(child => child.title) || []
        }))
    };

    const quizzes = rootNodes.filter(n => n.type === 'page' && n.slug.includes('quiz'));

    const navigationData = {
      medicalTopics,
      resources,
      commentary,
      procedures,
      quizzes
    };

    // Set cache headers
    const headers = new Headers();
    headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=150');

    return NextResponse.json(navigationData, { 
      status: 200,
      headers 
    });

  } catch (error) {
    console.error('Navigation API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch navigation', details: error.message },
      { status: 500 }
    );
  }
}