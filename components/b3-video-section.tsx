export function B3VideoSection() {
  return (
    <section aria-labelledby="b3-video-heading" className="bg-[#f4f1e7] px-5 py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#087a50]">The B3 story</p>
          <h2 id="b3-video-heading" className="mt-3 text-3xl font-black tracking-tight text-[#153c2b] sm:text-4xl">
            See B3 for yourself.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-8 text-[#65766b]">
            Watch the video and get a closer look at the thinking behind B3: Bring Back Barter.
          </p>
          <a
            href="https://www.youtube.com/watch?v=xO-QVXPeaAw"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#087a50] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#066642]"
          >
            Watch on YouTube <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="overflow-hidden rounded-[1.75rem] border border-[#dfe5d9] bg-[#102c20] p-2 shadow-[0_24px_70px_rgba(18,59,43,0.16)]">
          <div className="aspect-video overflow-hidden rounded-[1.2rem] bg-black">
            <iframe
              className="h-full w-full"
              src="https://www.youtube-nocookie.com/embed/xO-QVXPeaAw"
              title="B3: Bring Back Barter video"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
