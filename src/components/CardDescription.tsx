import UserAvatar from "./UserAvatar";

type Props = {};

function CardDescription({}: Props) {
  return (
    <div className="container mx-auto">
      <div className="max-w-2xl mx-auto px-8 py-3 shadow-2xl shadow-blue-800 roun">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center justify-center">
            <UserAvatar size={128} />
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-5xl font-bold">Hey! 🤓</h1>
            <h2 className="text-xl text-text-secondary">
              My name is <b>Sebastián Urbina</b>, Data Scientist & Software
              Engineer
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Welcome to my personal website. I'm passionate about data science,
              machine learning, and software development. Here you can find my
              projects, achievements, and thoughts on technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDescription;
