import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  Tree,
} from '@nrwl/devkit';

export default async function (tree: Tree, schema: any) {
  generateFiles(tree, joinPathFragments(__dirname, 'files'), `${schema.path}`, {
    componentName: schema.componentName,
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
