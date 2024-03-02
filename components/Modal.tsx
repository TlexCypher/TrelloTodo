'use client'

import useModalStore from '@/store/ModalStore'
import { Transition, Dialog } from '@headlessui/react'
import React, { Fragment } from 'react'
import ModalForm from './ModalForm'

const Modal = () => {
  const [isOpen, openModal, closeModal] = useModalStore((state) => [state.isOpen, state.openModal, state.closeModal])
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={closeModal}
        as="form"
        className="relative z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={"w-full max-w-md transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all"}
              >
                <ModalForm />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition >
  )
}

export default Modal
