import TimePassed from "./TimePassed";

interface MessagePreviewProps {
  previewProps: {
    clientName: string;
    clientImage: string;
    unreadCount: number;
    lastMessageAt: number;
    lastMessage: string;
  };
}

const MessagePreview: React.FC<MessagePreviewProps> = ({ previewProps }) => {
  return (
    <div
      className="
        relative
        w-[304px]
        h-[52px]
        rounded-[12px]
        flex
        gap-[8px]
        pt-[8px] pr-[12px] pb-[8px] pl-[8px]
        bg-alt-grey
        text-border-grey
        text-sm
        cursor-pointer
      "
    >
      <img
        src={previewProps.clientImage}
        alt={`${previewProps.clientName}'s profile picture`}
        className="w-[36px] h-[36px] rounded-full object-cover"
        onError={(e) => (e.currentTarget.src = "/pfp_img-placeholder.jpg")}
      />
      {previewProps.unreadCount > 0 && (
        <p
          className={`
        absolute
        top-[5px]
        ${previewProps.unreadCount > 99 ? "left-[28px]" : "left-[33px]"}
        flex items-center justify-center
        rounded-[12px]
        border
        border-alt-white
        bg-red-orange text-white
        text-[9px]
        font-medium
        leading-[1]
        h-[14px]
        ${previewProps.unreadCount > 99 ? "min-w-[22px]" : "w-[14px]"}
      `}
        >
          {previewProps.unreadCount > 99 ? "99+" : previewProps.unreadCount}
        </p>
      )}

      <div className="flex flex-col gap-[3px]">
        <p className="text-[#030303] h-[15px] font-medium leading-[1.1]">
          {previewProps.clientName}
        </p>
        <div className="flex items-center h-[17px]">
          <p className="max-w-[240px] text-[14px] overflow-hidden text-ellipsis whitespace-nowrap">
            {previewProps.lastMessage}
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
        <TimePassed
          timestamp={new Date(previewProps.lastMessageAt).getTime()}
        />
      </div>
    </div>
  );
};

export default MessagePreview;
