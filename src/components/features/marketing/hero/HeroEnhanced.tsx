            <div className="absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            <div className="absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }">
            <Image
              src={img}
              alt="Hero Background"
              fill
              sizes="100vw"
              priority={index === 0}
              style={{ objectFit: 'cover' }}
