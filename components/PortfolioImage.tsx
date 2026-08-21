import Image, { type ImageProps } from "next/image";

type PortfolioImageProps = Omit<ImageProps, "src" | "alt" | "fill"> & {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function PortfolioImage({ src, alt, sizes, priority = false, className, ...props }: PortfolioImageProps) {
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={80}
      unoptimized={!src.startsWith("/")}
      className={className}
    />
  );
}
