type ModalProps = {
  open: boolean;
  setOpenModal: (open: boolean) => void;
  onClose: () => void;
  data: string;
};

export default function Modal({
  open,
  setOpenModal,
  onClose,
  data,
}: ModalProps) {
  const handleClose = () => {
    setOpenModal(false);
    onClose();
  };
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={handleClose}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3">
                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                  <h4 className="text-lg font-medium text-gray-800">
                    Form JSON
                  </h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-500 break-words">
                    {data}
                  </p>
                  <div className="items-center gap-2 mt-3 sm:flex">
                    <button
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-gray-600 focus:ring-2"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
