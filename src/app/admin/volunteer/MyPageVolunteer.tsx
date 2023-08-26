'use client';

import { MyVolInfo } from '@/api/mypage/mypage';
import useMyInfo from '@/api/mypage/useMyInfo';
import useUpdateVolInfo from '@/api/mypage/useUpdateVolInfo';
import Button from '@/components/common/Button/Button';
import TextField from '@/components/common/TextField/TextField';
import { isShelterInfo } from '@/components/mypage/MyPageMain/MyPageMain';
import ToggleSection from '@/components/mypage/MyPageMain/ToggleSection';
import useHeader from '@/hooks/useHeader';
import useToast from '@/hooks/useToast';
import { formatPhone, phoneRegex, removeDash } from '@/utils/formatInputs';
import yup from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as styles from './styles.css';

interface UpdateMyVolInfo extends Pick<MyVolInfo, 'nickName' | 'phoneNumber'> {}

const validation = yup.object().shape({
  nickName: yup
    .string()
    .max(10)
    .required()
    .test(
      'no-emoji',
      '이모티콘은 사용할 수 없습니다',
      (value = '') =>
        !/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu.test(
          value || ''
        )
    ),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, '숫자만 입력해주세요')
    .test(
      'phone-format-validation',
      '전화번호 형식이 올바르지 않습니다',
      value => {
        let val = removeDash(value || '');
        if (!val || (val && val.length <= 3)) {
          return true;
        }

        const result = val.slice(0, 2);
        const phone = val.slice(2);

        if (result === '02' && (phone.length === 7 || phone.length <= 8)) {
          return true;
        } else if (
          phone.length === 7 ||
          phone.length === 8 ||
          phone.length === 9
        ) {
          return true;
        } else {
          return false;
        }
      }
    )
});

export default function MyPageVolunteer({
  dangle_role
}: {
  dangle_role: string;
}) {
  useHeader({ title: '계정 관리' });
  const router = useRouter();
  const toastOn = useToast();

  const { data: info } = useMyInfo(dangle_role, { enabled: !!dangle_role });

  const handlePhoneNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      event.target.value = formatPhone(value);
    },
    []
  );

  const method = useForm<UpdateMyVolInfo>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validation)
  });
  const {
    setValue,
    register,
    formState: { errors, isDirty },
    handleSubmit
  } = method;

  useEffect(() => {
    setValue('nickName', !isShelterInfo(info!) ? info?.nickName ?? '' : '');
    setValue(
      'phoneNumber',
      !isShelterInfo(info!) ? formatPhone(info?.phoneNumber ?? '') : ''
    );
  }, [info, setValue]);

  const { mutateAsync } = useUpdateVolInfo();
  const onVaild = (data: UpdateMyVolInfo) => {
    const payload = {
      ...data,
      phoneNumber: removeDash(data.phoneNumber),
      alarmEnabled: !isShelterInfo(info!) ? info?.alarmEnabled ?? true : true
    };
    mutateAsync(payload).then(res => {
      toastOn('계정 정보가 업로드 되었습니다.');
      router.push('/admin');
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onVaild)}>
        <div className={styles.wrapper}>
          <TextField
            label="닉네임"
            {...register('nickName')}
            error={errors.nickName}
          />
          <TextField
            label="연락처"
            {...register('phoneNumber', { onChange: handlePhoneNumberChange })}
            error={errors.phoneNumber}
          />
        </div>

        <Button
          disabled={!isDirty || !isEmpty(errors)}
          style={{ marginTop: '239px' }}
          type="submit"
        >
          수정하기
        </Button>
      </form>
    </>
  );
}
