interface HelloWorldProps {
  message?: string;
}

export const HelloWorld = ({ message = 'Hello, world!' }: HelloWorldProps) => {
  return <p>{message}</p>;
};
