"use client";

import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";

type GalleryImage = {
    asset: any;
    alt?: string;
};

export default function Gallery({ images }: { images: GalleryImage[] }) {
    const [active, setActive] = useState<number | null>(null);

    const close = () => setActive(null);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((img, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        className="aspect-square rounded-2xl overflow-hidden bg-[#14140F]/5 cursor-pointer focus:outline-none"
                    >
                        <img
                            src={urlFor(img).width(600).height(600).url()}
                            alt={img.alt ?? `Gallery photo ${i + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {active !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                    onClick={close}
                >
                    <img
                        src={urlFor(images[active]).width(1600).url()}
                        alt={images[active].alt ?? ""}
                        className="max-h-[90vh] max-w-full object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
