import { useState } from "react";
import { X } from "react-feather";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "../components";
import { useMutation } from '@apollo/client';
import { createPlanet, planets as planetsQuery } from "../store";

const ModalWrapper = styled.div`
  width: calc(752px - 96px);
  border-radius: 32px;

  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 32px;

  padding: 48px;
  /* margin-top: 148px; */
  margin-bottom: 48px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`
const CloseModalBtn = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 8px;

  background: rgb(18, 28, 51, 0.1);
  border-radius: 8px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;

  cursor: pointer;
`
const CloseModalIcon = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #121C33;
`
const ModalTitle = styled.h2`  
  width: 169px;
  height: 72px;
  
  font-style: normal;
  font-weight: 900;
  font-size: 48px;
  line-height: 72px;
  
  display: flex;
  align-items: center;
  letter-spacing: 1px;

  color: #121C33;
`
const ModalInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  margin-bottom: 48px;
`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  padding: 0px 0px 16px;

  width: 656px;
  /* height: 88px; */

  background: #FFFFFF;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  margin-bottom: 8px;
`
const InputLabel = styled.div`
  height: 24px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #121C33;

  flex: none;
  order: 0;
  flex-grow: 0;
`
const Input = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 16px;

  width: calc(656px - 32px);
  height: 40px;
  
  background: #F5F5F5;
  border-radius: 8px;
  border: none;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;

  color: #121C33;
  opacity: 0.6;

  :focus-visible {
    outline: 1px solid #121C33;
  }
`
const InputDescription = styled.div`
  height: 24px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: #121C33;
  opacity: 0.6;

  flex: none;
  order: 2;
  flex-grow: 0;

  a {
    color: #121C33;
  }
`
const ModalActionBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  gap: 16px;
`
const ErrorMsg = styled.div`
  
  /* width: 656px;
  height: 48px;
  left: 64px;
  top: 616px; */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;

  color: #AB192F;

  opacity: 0.6;
`
const CancelBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 24px;

  height: 48px;

  background: rgba(18, 28, 51, 0.05);
  border-radius: 8px;
  border: none;

  flex: none;
  order: 0;
  flex-grow: 0;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;

  color: #121C33;

  cursor: pointer;
`
const CreateBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 24px;

  height: 48px;

  background: #121C33;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: none;

  flex: none;
  order: 0;
  flex-grow: 0;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;

  color: #FFFFFF;

  cursor: pointer;
`

export const CreatePlanetPage = () => {

  const { goBack, } = useHistory()

  const [form, setForm] = useState({
    name: '',
    description: '',
    pictureUrl: ''
  })
  const [createPlanetFunc, { loading, error }] = useMutation(createPlanet(), {
    refetchQueries: [
      planetsQuery()
    ]
  });

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault()

    createPlanetFunc({
      variables: {
        ...form
      }
    }).then(_ => {
      localStorage.setItem('fromCreatePage', true)
      if (!error) goBack()
    })

  }

  return (
    <Modal>
      <ModalWrapper>

        <CloseModalBtn type="button" disabled={loading} onClick={() => { localStorage.setItem('fromCreatePage', true); goBack() }}>
          <CloseModalIcon>
            <X size={32} />
          </CloseModalIcon>
        </CloseModalBtn>

        <ModalTitle>Planet</ModalTitle>

        <form onSubmit={handleSubmit}>

          <ModalInputWrapper>

            <InputWrapper>
              <InputLabel>Name</InputLabel>
              <Input type='text' disabled={loading} maxLength={20} required onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </InputWrapper>

            <InputWrapper>
              <InputLabel>Image</InputLabel>
              <Input type='text' disabled={loading} required onChange={(e) => setForm({ ...form, pictureUrl: e.target.value })} />
              <InputDescription>
                <span>Paste the URL of a JPG or PNG of max 20 kb. </span>
                <a href={`https://www.shutterstock.com/search/${form.name || 'planets'}?orientation=horizontal&image_type=photo`} target='_blank' rel='noreferrer'>Check here.</a>
              </InputDescription>
            </InputWrapper>

            <InputWrapper>
              <InputLabel>Description</InputLabel>
              <Input type='text' disabled={loading} minLength={15} maxLength={300} required onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </InputWrapper>

            {
              error &&
              <ErrorMsg>Bummer! We can't create this planet right now. Probably a black hole in the way. Try later please.</ErrorMsg>
            }

          </ModalInputWrapper>

          <ModalActionBtns>
            <CancelBtn disabled={loading} type="reset" onClick={() => goBack()}>CANCEL</CancelBtn>
            <CreateBtn disabled={loading} type="submit">{loading ? 'CREATING PLANET ...' : 'CREATE PLANET'}</CreateBtn>
          </ModalActionBtns>

        </form>

      </ModalWrapper>
    </Modal>
  )
}