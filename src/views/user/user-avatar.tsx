import { updateUserAvatar } from '@/api/user-api';
import useUserStore, { selectAvatar } from '@/store/user-store';
import { Avatar, Button, message, Space } from 'antd'
import React, { ChangeEvent, useMemo, useRef, useState } from 'react'
import { ActionFunctionArgs, useNavigation, useSubmit } from 'react-router';

type Props = {}

export default function UserAvatar({ }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const avatar = useUserStore(selectAvatar);
  const [newAvatar, setNewAvatar] = useState<string>('');
  const submit = useSubmit();
  const navigation = useNavigation()

  const onImageSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;

    // transfer avatar to byte string
    const fr = new FileReader();
    fr.readAsDataURL(files[0]);
    fr.onload = () => {
      if (fr.result) {
        setNewAvatar(fr.result.toString())
      }
    }
  }

  const saveAvatar = () => {
    submit({ avatar: newAvatar }, { method: 'PATCH' })
  }

  const disableSave = useMemo(() => {
    return !newAvatar || newAvatar == avatar;
  }, [newAvatar, avatar])

  return (
    <Space direction={'vertical'}>
      {
        newAvatar || avatar ?
          <Avatar shape={'square'} size={300} src={avatar || newAvatar} /> :
          <Avatar shape={'square'} size={300}>Please select avatar</Avatar>
      }
      <Space>
        <input ref={inputRef} type={'file'} style={{ display: 'none' }} accept={'image/*'} onChange={onImageSelected} />
        <Button type={'primary'} disabled={disableSave} onClick={() => saveAvatar()} loading={navigation.state != 'idle' && { delay: 200 }}>Save Avatar</Button>
        <Button onClick={() => inputRef.current?.click()}>Select Avatar</Button>
      </Space>
    </Space>
  )
}

export const updateAvatarAction = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const x = Object.fromEntries(fd)
  const res = await updateUserAvatar(x.avatar.toString());
  if (res.code == 1) return null;
  message.info('avatar update done')
  return null;
}