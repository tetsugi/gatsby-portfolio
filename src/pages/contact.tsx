import { useForm } from "react-hook-form"
import React from "react"

import Helmet from "@/components/Helmet"
import PaddingLayout from "@/layouts/PaddingLayout"
import Paragraph from "@/components/Paragraph"
import styled from "@emotion/styled"

const Section = styled.section`
  margin: 0 auto;
  max-width: 640px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 32px;
`

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: bold;
  color: white;
`

const Errors = styled(Paragraph)`
  min-height: 24px;
  color: rgb(236, 89, 144);
`

const Note = styled(Paragraph)`
  color: white;
`

const Input = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
`

const Textarea = styled.textarea`
  resize: vertical;
  min-height: 160px;
  border-radius: 4px;
`

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 12px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
`

const ContactPage: React.FC = () => {
  const { handleSubmit, register, errors } = useForm()

  const onSubmit: Parameters<typeof handleSubmit>[0] = (_, e) => {
    e?.target.submit()
  }

  return (
    <PaddingLayout>
      <Helmet title="Contact" description="お問い合わせフォームです。耳寄りな情報待ってます。" />

      <Section>
        <Note>
          お問い合わせに関しては、採用関係・質問・バグ報告・何か面白そうな話などについて受け付けております。<br />
          セールス・勧誘などは固くお断りいたしますのでご了承ください。
        </Note>

        <Form
          name="contact"
          method="post"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact" />

          <Label>お名前</Label>
          <Input
            name="name"
            ref={register({
              required: true,
            })}
          />
          <Errors>{errors.name && "お名前の入力は必須です"}</Errors>

          <Label>メールアドレス</Label>
          <Input
            name="email"
            ref={register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "",
              },
            })}
          />
          <Errors>{errors.email && "メールアドレスが正しくありません"}</Errors>

          <Label>内容</Label>
          <Textarea
            name="content"
            ref={register({
              required: true,
            })}
          />
          <Errors>{errors.content && "内容の入力は必須です"}</Errors>

          <SubmitButton type="submit">送信</SubmitButton>
        </Form>
      </Section>
    </PaddingLayout>
  )
}
  
export default ContactPage
