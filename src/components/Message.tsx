import React from "react";

interface MessageProps {
  message: string;
  isSent: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isSent }) => {
  // Define styles for sent messages
  const sentStyles: React.CSSProperties = {
    maxWidth: "264px",
    borderTopLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    borderBottomLeftRadius: "16px",
    padding: "12px",
    background: "#FFDFDF",
    marginLeft: "auto",
    wordBreak: "break-word",
    fontSize: "14px",
    whiteSpace: "pre-line",
  };
  // Define styles for received messages
  const receivedStyles: React.CSSProperties = {
    maxWidth: "264px",
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
    borderBottomLeftRadius: "16px",
    padding: "12px",
    background: "#DEDEDE4D",
    marginRight: "auto",
    wordBreak: "break-word",
    fontSize: "14px",
    whiteSpace: "pre-line",
  };

  // Choose styles based on the isSent prop
  const styles = isSent ? sentStyles : receivedStyles;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <div style={styles}>{message}</div>
    </div>
  );
};

export default Message;
