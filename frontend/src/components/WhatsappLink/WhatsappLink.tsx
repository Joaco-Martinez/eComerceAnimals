import Image from "next/image";

export default function WhatsappLink() {
  const url = `https://api.whatsapp.com/send?phone=543546431231&text=Hola%2C%20te%20escribo%20desde%20tu%20página%20de%20Punky%20Pet%20🐾`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <Image
        src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/whatsapp_oo9us9"
        alt="Whatsapp"
        width={40}
        height={40}
        style={{
          filter:
            "invert(39%) sepia(10%) saturate(200%) hue-rotate(315deg) brightness(90%) contrast(85%)",
        }}
      />
    </a>
  );
}
