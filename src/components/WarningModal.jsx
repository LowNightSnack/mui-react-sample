const WarningModal = ({ message, hide }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return message !== "" ? (
    <div className="warningModal" onClick={hide}>
      <div className="warningModalContent" onClick={handleClick}>
        <p>{message}</p>
        <button className="closeModalButton" onClick={hide}>
          X
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default WarningModal;
