import { BoardImage } from './types';

const DEFAULT_BOARD_IMAGE_URLS: BoardImage[] = [
  {
    description: 'bird flying over mountain with trees',
    small:
      'https://images.unsplash.com/photo-1486691541334-8cbe8b4ea413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=80&w=400',
    big: 'https://images.unsplash.com/photo-1486691541334-8cbe8b4ea413?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=85',
  },
  {
    description: 'a snow covered mountain range under a blue sky',
    small:
      'https://images.unsplash.com/photo-1648379420214-efe9cdb47e10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=80&w=400',
    big: 'https://images.unsplash.com/photo-1648379420214-efe9cdb47e10?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=85',
  },
  {
    description: 'blue and white round illustration',
    small:
      'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=80&w=400',
    big: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=85',
  },
  {
    description: 'people on snow covered ground during daytime',
    small:
      'https://images.unsplash.com/photo-1516452151280-5aad8c38ec22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=80&w=400',
    big: 'https://images.unsplash.com/photo-1516452151280-5aad8c38ec22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=85',
  },
  {
    description: 'a winding road in the middle of a mountain range',
    small:
      'https://images.unsplash.com/photo-1650122641062-ff40de2f25a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=80&w=400',
    big: 'https://images.unsplash.com/photo-1650122641062-ff40de2f25a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=85',
  },
  {
    description: 'a black background with a blue and yellow pattern',
    small:
      'https://images.unsplash.com/photo-1687432517546-3a7bcef593ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=80&w=400',
    big: 'https://images.unsplash.com/photo-1687432517546-3a7bcef593ed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=85',
  },
  {
    description: 'surfboard about to meet wild waves',
    small:
      'https://images.unsplash.com/photo-1475850353411-26df570ed0ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=80&w=400',
    big: 'https://images.unsplash.com/photo-1475850353411-26df570ed0ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=85',
  },
  {
    description: 'man walking on tiled ground at daytime',
    small:
      'https://images.unsplash.com/photo-1485382051606-3a8f167507a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=80&w=400',
    big: 'https://images.unsplash.com/photo-1485382051606-3a8f167507a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=85',
  },
  {
    description: 'low angle photography of skies',
    small:
      'https://images.unsplash.com/photo-1457685373807-8c4d8be4c560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=80&w=400',
    big: 'https://images.unsplash.com/photo-1457685373807-8c4d8be4c560?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=85',
  },
  {
    description: 'shallow focus photography of orange Volkswagen Beetle',
    small:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=80&w=400',
    big: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDQzMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDM0MTM0MzJ8&ixlib=rb-4.0.3&q=85',
  },
];

export { DEFAULT_BOARD_IMAGE_URLS };
