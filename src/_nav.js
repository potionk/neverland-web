export default {
  items: [
    {
      name: 'Home',
      url: '/home',
      icon: 'icon-home',
    },
    {
      name: 'COC Test',
      url: '/COC',
      icon: 'icon-home',
    },
    {
      name: 'News',
      url: '/news',
      icon: 'icon-bulb',
    },
    {
      name: 'Community',
      url: '/community',
      icon: 'icon-note',
      children: [
        {
          name: '자유게시판',
          url: '/community/free',
          icon: 'icon-pencil',
        },
        {
          name: '정보게시판',
          url: '/community/information',
          icon: 'icon-pencil',
        },
        {
          name: '여행게시판',
          url: '/community/travel',
          icon: 'icon-pencil',
        },
        {
          name: '사진게시판',
          url: '/community/photo',
          icon: 'icon-pencil',
        },
        {
          name: '게임게시판',
          url: '/community/gameBBS',
          icon: 'icon-pencil',
        },
      ],
    },
    {
      name: 'Game',
      url: '/game',
      icon: 'icon-game-controller',
      children: [
        {
          name: '공지사항',
          url: '/game/notice',
          icon: 'icon-bulb',
        },
        {
          name: '업데이트',
          url: '/game/update',
          icon: 'icon-magic-wand',
        },
        {
          name: '이벤트',
          url: '/game/event',
          icon: 'icon-fire',
        },
        {
          name: '랭킹',
          url: '/game/ranking',
          icon: 'icon-people',
        },
        {
          name: '자료실',
          url: '/game/download',
          icon: 'icon-folder-alt',
        },
      ],
    },
  ],
};
