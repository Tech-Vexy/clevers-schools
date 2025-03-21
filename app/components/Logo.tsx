import Image from 'next/image';

export const Logo = ({ className = '' }) => {
  return (
    <div className={`relative w-32 h-12 ${className}`}>
      <Image
        src="/image.png" // Update with your logo path
        alt="Clevers Schools Logo"
        fill
        sizes="(max-width: 768px) 100vw, 128px"
        priority
        className="object-contain"
      />
    </div>
  );
};