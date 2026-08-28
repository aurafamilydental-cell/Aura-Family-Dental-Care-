import Image from "next/image";

interface BeforeAfterSplitCardProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSplitCard({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSplitCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full h-full">
      {/* Before Image Card */}
      <div className="relative aspect-[4/3] w-full md:w-1/2 rounded-brand border border-border-subtle overflow-hidden shadow-sm group">
        <Image
          src={beforeImage}
          alt={`${beforeLabel} transformation`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4 z-20">
          <span className="bg-accent/80 backdrop-blur-sm px-4 py-2 rounded text-white text-xs font-semibold uppercase tracking-widest shadow-md">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* After Image Card */}
      <div className="relative aspect-[4/3] w-full md:w-1/2 rounded-brand border border-border-subtle overflow-hidden shadow-md group">
        <Image
          src={afterImage}
          alt={`${afterLabel} transformation`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-4 right-4 z-20">
          <span className="bg-primary/90 backdrop-blur-sm px-4 py-2 rounded text-white text-xs font-semibold uppercase tracking-widest shadow-md">
            {afterLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
