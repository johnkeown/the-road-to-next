import { Separator } from "./ui/separator";

type HeadingPropsType = {
  title: string;
  description?: string;
};

const Heading = ({ title, description }: HeadingPropsType) => {
  return (
    <>
      <div className="px-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Separator />
    </>
  );
};

export default Heading;
