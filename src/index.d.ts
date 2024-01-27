type FileImage = {
  id: string;
  url: string;
};

type InstaWeddingHall = {
  name: string;
  address: string;
  images: FileImage[];
  content: string;
};

type InstaStory = {
  id: string;
  title: string;
  images: FileImage[];
};

type InstaPost = {
  id: string;
  title: string;
  content: string;
  images: FileImage[];
};
