import { dialog } from 'electron';

import { DeepLinkResolvers } from '..';

const resolvers: DeepLinkResolvers = {
  '/test/:id': async ({ params }) => {
    dialog.showMessageBox({
      title: 'Deep Link',
      message: `${params.id}`,
    });
  },
};

export default resolvers;
