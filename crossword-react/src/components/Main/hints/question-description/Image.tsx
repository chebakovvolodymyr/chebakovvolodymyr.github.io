interface ImageProps {
  picture: {
    url: string;
    author: string;
  };
}

export const Image = ({ picture: { url, author } }: ImageProps) => (
  <div className="question_image">
    <img src={url} width={200} alt={author} />
    {author}
  </div>
);
