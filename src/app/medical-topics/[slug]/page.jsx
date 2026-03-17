import { notFound } from 'next/navigation';
import SectionContent from '@/components/medical-topics/SectionContent';
import { isValidTopicData } from '@/lib/medical-topics/utils';

export async function generateStaticParams() {
  try {
    // Import index.json to get all available slugs
    const indexData = (await import('@/data/medical-topics/index.json')).default;
    
    // Return array of params objects
    return Object.keys(indexData).map((slug) => ({
      slug: slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export default async function SectionPage({ params }) {
  // Await params if it's a promise (Next.js 15+)
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  console.log(slug)
  
  // Validate slug exists
  if (!slug) {
    console.error('No slug provided');
    return notFound();
  }

  try {
    // First verify if this slug exists in index
    let indexData;
    try {
      indexData = (await import('@/data/medical-topics/index.json')).default;
    } catch (indexError) {
      console.error('Failed to load index.json:', indexError);
      return notFound();
    }

    // Check if slug exists in index
    if (!indexData[slug]) {
      console.error(`Slug "${slug}" not found in index`);
      return notFound();
    }

    // Dynamic import the section data
    let sectionData;
    try {
      sectionData = (await import(`@/data/medical-topics/${slug}.json`)).default;
    } catch (importError) {
      console.error(`Failed to import data for slug: ${slug}`, importError);
      return notFound();
    }
    
    // Validate data structure
    if (!isValidTopicData(sectionData)) {
      console.error(`Invalid data structure for slug: ${slug}`);
      return notFound();
    }
    
    return <SectionContent 
      section={sectionData} 
      sectionSlug={slug} 
      sectionTitle={indexData[slug].title}
    />;
  } catch (error) {
    console.error(`Unexpected error loading section: ${slug}`, error);
    return notFound();
  }
}