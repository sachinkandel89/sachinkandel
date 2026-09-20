import PhotographyGallery from "@/components/PhotographyGallery";

export const revalidate = 60;

type DriveImage = {
    id: string;
    title: string;
    filename: string;
    uploadedAt: string;
    url: string;
};

type ImagesData = Record<string, DriveImage[]>;

interface ManifestImage {
    name: string;
    path: string;
    size: number;
    updatedAt: string;
}

interface ManifestCategory {
    category: string;
    count: number;
    images: ManifestImage[];
}

interface ManifestData {
    generatedAt: string;
    count: number;
    categories: ManifestCategory[];
}

const MANIFEST_URL =
    "https://cdn.jsdelivr.net/gh/sachinkandel89/sk_assets@master/manifest.json";
const CDN_BASE_URL =
    "https://cdn.jsdelivr.net/gh/sachinkandel89/sk_assets@master/";

async function getImages(): Promise<ImagesData> {
    try {
        const res = await fetch(MANIFEST_URL, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Failed to fetch manifest:", res.status, res.statusText);
            return {};
        }

        const data: ManifestData = await res.json();
        const imagesData: ImagesData = {};

        if (Array.isArray(data.categories)) {
            for (const cat of data.categories) {
                imagesData[cat.category] = (cat.images || []).map((img) => ({
                    id: img.path,
                    title: img.name.replace(/\.[^/.]+$/, ""),
                    filename: img.name,
                    uploadedAt: img.updatedAt,
                    url: `${CDN_BASE_URL}${encodeURI(img.path)}`,
                }));
            }
        }

        return imagesData;
    } catch (error) {
        console.error("Error fetching images manifest:", error);
        return {};
    }
}

export default async function PhotographyPage() {
    const images = await getImages();
    const categories = Object.keys(images);

    return (
        <main className="min-h-screen w-full bg-[#F3EFE7] text-[#22201c]">
            <div className="relative mx-auto min-h-screen w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 pb-24">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-black/10 font-black">
                        SAJHA MOMENTS
                    </h1>
                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#4f493f]">
                        A collection of places, people, and quiet Moments
                    </p>
                </div>

                <PhotographyGallery images={images} categories={categories} />
            </div>
        </main>
    );
}

