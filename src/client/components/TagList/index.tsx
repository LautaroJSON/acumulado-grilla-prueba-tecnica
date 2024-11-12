interface ITagList {
  tags: Array<{
    slug: string;
    text: string;
  }> | null;
}

export const TagList = ({ tags }: ITagList) => {
  if (!tags) return null;

  return (
    <div className="cont_tags com-secondary-tag hlp-marginBottom-20">
      {tags.map((t) => (
        <a key={t.slug}>{t.text}</a>
      ))}
    </div>
  );
};
