import NodePage from "@/components/common/NodePage";
import NotFound from "../not-found";

export default async function DynamicPage({ params }) {
  const resolvedParams = await params;

  if (!resolvedParams?.slug) {
    return <NotFound />;
  }

  const slugPath = resolvedParams.slug.join("/");

  return <NodePage slugPath={slugPath} />;
}