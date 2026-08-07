import { useMedia } from "../hooks/useMedia";
import type { Media } from "../types/MediaTypes";

export default function Medias() {
  const { data, isLoading, error } = useMedia();

  if (isLoading) return <h1>Loading...</h1>;
  console.log("Media data:", data);

  if (error) return <h1>Error: {error.message}</h1>;

  if (data == undefined || data.data == undefined) {
    return <h1>No media data available</h1>;
  }

  return (
    <>
      {data?.data.map((media: Media) => (
        <div key={media.MediaTitle}>
          <h2>{media.MediaTitle}</h2>
          <p>{media.MediaDescription}</p>
          <p>{media.Ratings}</p>
          <p>{media.MediaType}</p>
        </div>
      ))}
    </>
  );
}
