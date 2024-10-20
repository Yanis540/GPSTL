// mockData/publications.ts
export interface PublicationInterface {
    id: number;
    author: string;
    title: string;
    description: string;
    timeAgo: string;
    image?: string;
    reactions: {
      likes: number;
      comments: number;
      shares: number;
      sent: number;
    };
    comments: Comment[];
  }
  
  export interface Comment {
    id: number;
    author: string;
    content: string;
    avatarUrl: string;
    time: string;
    likes: number;
    replies: number;
  }
  
  const images = [
    "https://github.com/shadcn.png"
  ];
  
  const authors = [
    'Amit Das',
    'Maya Ali',
    'Ralph Edwards',
    'Ayushi Patel',
    'Diana Watts',
    'Jonathan Doe',
    'Emily Stone',
    'Michael Scott',
    'Pam Beesly',
    'Zara Hassan',
    'Sam Smith',
    'Nina Roberts',
    'Chris Evans',
    'Sophia Turner',
    'Lucas Adams',
    'Emma Watson',
    'Ryan Gosling',
    'Olivia Brown',
    'Daniel Craig',
    'Megan Fox',
    'Elijah Wood',
    'Chloe Kim',
    'Kevin Durant',
    'Sarah Johnson',
    'Tom Holland',
  ];
  
  const commentsContents = [
    'C\'est vraiment un excellent point, merci pour le partage !',
    'En mauris porttitor tincidunt mauris massa sit lorem sed scelerisque...',
    'Je suis d\'accord, la mise à jour de mon portfolio a vraiment changé la donne.',
    'Le travail à distance a complètement changé ma façon de travailler.',
    'Merci pour les conseils, cela m\'a beaucoup aidé !',
    'La créativité est la clé pour résoudre les problèmes complexes.',
    'Merci pour ces astuces, je les mets en pratique dès demain.',
    'Je n\'avais jamais pensé à ça de cette manière, très instructif.',
    'Est-ce que quelqu\'un a déjà essayé cela ?',
    'Je pense que cela peut fonctionner si c\'est bien fait.',
    'C\'est la première fois que je vois une approche aussi innovante.',
    'Les temps changent, il faut s\'adapter rapidement.',
    'Merci pour le rappel, c\'est très important.',
    'J\'aimerais en savoir plus sur cette méthode.',
    'Très bon article, cela m\'a ouvert les yeux sur certains points.',
    'Cela pourrait fonctionner, mais il y a quelques défis à considérer.',
    'Je n\'étais pas d\'accord au début, mais cela m\'a fait réfléchir.',
    'C\'est une excellente analyse de la situation actuelle.',
    'Je vais partager cet article avec mes collègues, très intéressant.',
    'Il y a beaucoup de bonnes idées ici, merci pour le partage.',
    'Cela a vraiment changé ma façon de penser.',
    'Je suis curieux de savoir comment cela s\'applique dans d\'autres industries.',
    'Merci pour ce contenu, c\'est vraiment enrichissant.',
    'Je ne sais pas si cela va fonctionner pour tout le monde, mais ça vaut le coup d\'essayer.',
    'C\'est fascinant de voir comment les choses évoluent dans ce domaine.',
  ];
  
  const getRandomImage = () => images[Math.floor(Math.random() * images.length)];
  const getRandomAuthor = () => authors[Math.floor(Math.random() * authors.length)];
  const getRandomContent = () => commentsContents[Math.floor(Math.random() * commentsContents.length)];
  
  const generateComments = (count: number): Comment[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      author: getRandomAuthor(),
      avatarUrl: getRandomImage(),
      content: getRandomContent(),
      time: `${Math.floor(Math.random() * 24) + 1}h`,
      likes: Math.floor(Math.random() * 100),
      replies: Math.floor(Math.random() * 10),
    }));
  };
  
  export const publicationsData: PublicationInterface[] = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    author: getRandomAuthor(),
    title: `Post n°${index + 1}: Un regard sur les meilleures pratiques dans le domaine`,
    description: `Voici une longue description du post n°${index + 1}, où l'on explore les différentes stratégies et approches pour atteindre ses objectifs. Le travail à distance, la gestion de projet, et l'importance de la créativité sont au cœur de cette discussion. L'auteur partage des astuces pratiques, des conseils avisés et des réflexions sur les défis à surmonter dans un environnement de travail en constante évolution. Ce post se veut inspirant et motivant pour tous ceux qui cherchent à améliorer leur productivité et leur bien-être au travail. N'hésitez pas à partager vos retours et vos expériences !`,
    timeAgo: `${Math.floor(Math.random() * 48) + 1}h`,
    image: getRandomImage(),
    reactions: {
      likes: Math.floor(Math.random() * 500),
      comments: 25,
      shares: Math.floor(Math.random() * 50),
      sent: Math.floor(Math.random() * 30),
    },
    comments: generateComments(25),
  }));
  
  