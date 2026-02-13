export default function ThirdSection() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - How it works */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How it works
            </h2>
            <div className="text-gray-600 space-y-3">
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

          {/* Right side - YouTube video */}
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://youtu.be/8Q1S3jmiIl8?si=oD4zvORKHtLaPCUQ"
              title="How it works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
