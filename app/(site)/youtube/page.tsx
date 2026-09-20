import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type YoutubeVideo = {
  _id: string;
  title: string;
  youtubeUrl: string;
  description?: string;
  featured?: boolean;
  playlist?: string;
  playlistUrl?: string;
};

const VIDEOS_QUERY = `*[_type == "youtubeVideo"] | order(order asc, _createdAt desc){
  _id,
  title,
  youtubeUrl,
  description,
  featured,
  playlist,
  playlistUrl
}`;

function getYoutubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

export default async function YouTubePage() {
  const videos: YoutubeVideo[] = await client.fetch(VIDEOS_QUERY);

  const featured = videos.filter((v) => v.featured);

  const playlistsMap = videos.reduce<
    Record<string, { url?: string; videos: YoutubeVideo[] }>
  >((acc, video) => {
    if (!video.playlist) return acc;
    if (!acc[video.playlist]) {
      acc[video.playlist] = { url: video.playlistUrl, videos: [] };
    }
    if (video.playlistUrl) {
      acc[video.playlist].url = video.playlistUrl;
    }
    acc[video.playlist].videos.push(video);
    return acc;
  }, {});

  const playlistNames = Object.keys(playlistsMap);

  return (
    <main className="min-h-screen w-full bg-[#F3EFE7] text-[#22201c]">
      <div className="relative mx-auto min-h-screen w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="mb-14">
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl leading-tight">
            Featured videos & playlists
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#4f493f]">
            Travel stories, life in Australia, and practical guides for Nepali
            migrants - all in one place.
          </p>
        </div>

        {featured.length > 0 && (
          <section className="mb-20">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a3947c] mb-6">
              Featured Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((video) => {
                const id = getYoutubeId(video.youtubeUrl);
                if (!id) return null;
                return (
                  <div key={video._id} className="flex flex-col">
                    <div className="relative aspect-video overflow-hidden bg-black/5 mb-4">
                      <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <h3 className="font-[var(--font-display)] text-lg leading-snug">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="mt-1.5 text-sm text-[#555048] leading-relaxed">
                        {video.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {playlistNames.length > 0 && (
          <section className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a3947c] mb-6">
              Playlists
            </h2>
            <div className="space-y-14">
              {playlistNames.map((name) => {
                const group = playlistsMap[name];
                return (
                  <div key={name}>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                      <h3 className="font-[var(--font-display)] text-2xl">
                        {name}
                      </h3>
                      {group.url && (
                        <a
                          href={group.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[#22201c] underline underline-offset-4 hover:text-[#8B6E5C] transition-colors"
                        >
                          Open full playlist →
                        </a>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.videos.map((video) => {
                        const id = getYoutubeId(video.youtubeUrl);
                        if (!id) return null;
                        return (
                          <div key={video._id} className="flex flex-col">
                            <div className="relative aspect-video overflow-hidden bg-black/5 mb-3">
                              <iframe
                                src={`https://www.youtube.com/embed/${id}`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                              />
                            </div>
                            <h4 className="text-base font-medium leading-snug">
                              {video.title}
                            </h4>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {videos.length === 0 && (
          <p className="text-[#555048]">No videos added yet.</p>
        )}
      </div>
    </main>
  );
}