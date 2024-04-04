export const Loading = () => {
  return (
    <div className="lds-ellipsis inline-block relative w-10 h-3">
      <div className="absolute top-0.5 left-0 w-2 h-2 rounded-full bg-current" />
      <div className="absolute top-0.5 left-0 w-2 h-2 rounded-full bg-current" />
      <div className="absolute top-0.5 left-4 w-2 h-2 rounded-full bg-current" />
      <div className="absolute top-0.5 left-8 w-2 h-2 rounded-full bg-current" />
    </div>
  );
};
