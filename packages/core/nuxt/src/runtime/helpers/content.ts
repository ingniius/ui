export function findPageBreadcrumb(navigation, page) {
  if (!navigation || !page) return [];
  return navigation.reduce((breadcrumb, link) => {
    if (page._path && (page._path + "/").startsWith(link._path + "/")) {
      if (link.children) {
        breadcrumb.push(link);
        breadcrumb.push(...findPageBreadcrumb(link.children, page));
      }
    }
    return breadcrumb;
  }, []);
}
