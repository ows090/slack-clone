import React, { useCallback, useState } from 'react';
import { Form, Label, Input, LinkContainer, Button, Header } from './styles';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const onChangeEmail = useCallback((e) => {
    const { value } = e.target;
    setEmail(value);
  }, []);
  const onChangeNickname = useCallback((e) => {
    const { value } = e.target;
    setNickname(value);
  }, []);
  const onChangePassword = useCallback((e) => {
    const { value } = e.target;
    setPassword(value);
  }, []);
  const onChangePasswordCheck = useCallback((e) => {
    const { value } = e.target;
    setPasswordCheck(value);
  }, []);

  return (
    <div id="container">
      <Header>SLEACT</Header>
      <Form>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?
        <a href="/login">로그인 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default Signup;
