export default function ThirdSection() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Left side - How it works */}
          <div className="space-y-3 sm:space-y-4 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              How it works
            </h2>
            <div className="text-sm sm:text-base text-gray-600 space-y-2 sm:space-y-3">
              <p>
                Discover how our smart bookmark system simplifies your browsing
                experience.
              </p>
              <p>
                Watch the video to see the features in action and learn how to
                get started.
              </p>
            </div>
          </div>

          {/* Right side - YouTube video showcase the project*/}
          <div className="aspect-video w-full px-4 sm:px-0">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/8Q1S3jmiIl8?si=D2X1mXQxsVP2OL3m"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
