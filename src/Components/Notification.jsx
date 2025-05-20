import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Toast } from 'primereact/toast';
const Notification = forwardRef((props, ref) => {
  const toast = useRef(null);
  useImperativeHandle(ref, () => ({
    show(type, header, message) {
      toast.current.show({ severity: type, summary: header, detail: message});
    }
  }));
  return (
    <div className="my-toast">
      <Toast ref={toast} position="top-right" />
    </div>
  )
});

export default Notification;
