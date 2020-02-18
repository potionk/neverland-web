export default {
  items: [
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
          url: '/base/breadcrumbs',
          icon: 'icon-pencil',
        },
        {
          name: '정보게시판',
          url: '/base/breadcrumbs',
          icon: 'icon-pencil',
        },
        {
          name: '여행게시판',
          url: '/base/breadcrumbs',
          icon: 'icon-pencil',
        },
        {
          name: '사진게시판',
          url: '/base/breadcrumbs',
          icon: 'icon-pencil',
        },
        {
          name: '게임게시판',
          url: '/base/breadcrumbs',
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
          url: '/base/breadcrumbs',
          icon: 'icon-bulb',
        },
        {
          name: '업데이트',
          url: '/base/breadcrumbs',
          icon: 'icon-magic-wand',
        },
        {
          name: '이벤트',
          url: '/base/breadcrumbs',
          icon: 'icon-fire',
        },
        {
          name: '랭킹',
          url: '/base/breadcrumbs',
          icon: 'icon-people',
        },
        {
          name: '자료실',
          url: '/base/breadcrumbs',
          icon: 'icon-folder-alt',
        },
      ],
    },
  ],
};
