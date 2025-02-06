export default function Profile() {
    return (
      <div className="h-full flex flex-col justify-start">
        <h1 className="text-xl font-bold mb-2">Muhammad Dimas</h1>
        <h2 className="text-sm text-gray-600 mb-4">Web Developer & Visual Desainer</h2>
        <p className="text-gray-500 mb-4 text-xs">
        a Junior Programmer and Digital Artist who`s all about design,
        </p>
        <div className="flex gap-4 text-xs">
          <a href="https://github.com" className="text-gray-900 hover:text-gray-500">
            Email
          </a>
          <a href="https://linkedin.com" className="text-gray-900 hover:text-gray-500">
            Github
          </a>
          <a href="https://linkedin.com" className="text-gray-900 hover:text-gray-500">
            X / Twitter
          </a>
        </div>
      </div>
    );
  }