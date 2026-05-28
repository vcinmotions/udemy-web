export const getYoutubeEmbedUrl = (url: string) => {
  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

  const match = url.match(regExp);

  if (!match) return '';

  return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
};