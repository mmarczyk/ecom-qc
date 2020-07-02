const Popular = () => {
  return (
    <div className="Popular">
      <span>Popularne</span>
      <div dangerouslySetInnerHTML={{ __html: sProducts }}/>
    </div>
  );
};