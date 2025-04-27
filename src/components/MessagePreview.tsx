import TimePassed from "./TimePassed";

interface MessagePreviewProps {
  // The user information will be passed as props. This can be changed if needed.
  message: {
    username: string;
    picture: string;
    messageid: string;
    text: string;
    timestamp: number;
  };
}

const MessagePreview: React.FC<MessagePreviewProps> = ({ message }) => {
  return (
    <div
      className="
        relative
        w-full
        w-[304px]
        h-[52px]
        rounded-[12px]
        flex
        gap-[8px]
        pt-[8px] pr-[12px] pb-[8px] pl-[8px]
        bg-[#DEDEDE4D]
        text-[#959494]
        text-sm
      "
    >
      <img
        src="/pfp_img-placeholder.jpg"
        alt="profile picture"
        className="w-[36px] h-[36px] rounded-full object-cover"
      />
      <p
        className="
        absolute
        top-[5px]
        left-[33px]
        flex items-center justify-center
        rounded-[12px]
        border
        border-[#F5F8FA]
        bg-[#FF3131] text-[#FFFFFF]
        text-[9px]
        font-medium
        leading-[1]
        h-[14px]
        w-[14px]
      "
      >
        2
      </p>
      <div className="flex flex-col gap-[3px]">
        <p className="text-[#030303] h-[15px] font-medium leading-[1.1]">
          {message.username}
        </p>
        <div className="flex items-center h-[17px]">
          <p className="max-w-[240px] text-[14px] overflow-hidden text-ellipsis whitespace-nowrap">
            {message.text}
          </p>
        </div>
      </div>
      <div
        className="
          absolute
          top-[8px]
          right-[12px]
          text-[10px]
          leading-[1]
        "
      >
        <TimePassed timestamp={message.timestamp} />
      </div>
    </div>
  );
};

export default MessagePreview;
