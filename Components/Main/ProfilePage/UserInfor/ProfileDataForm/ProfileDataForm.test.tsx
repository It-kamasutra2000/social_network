import React, { FC } from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { ProfileDataForm, ProfileDataFormPropsType } from './ProfileDataForm';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../../../Redux/store';
import { ProfileType } from '../../../../../types/types';
import userEvent from '@testing-library/user-event';

describe('ProfileDataForm component test', () => {

    type ProfileDataFormContainerPropsType = Partial<ProfileDataFormPropsType>

    global.matchMedia = global.matchMedia || function () {
        return {
            addListener: jest.fn(),
            removeListener: jest.fn(),
        };
    };

    const profileData = {
        userId: 500,
        lookingForAJob: true,
        lookingForAJobDescription: 'react',
        fullName: '',
        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: ''
        },
        photos: {
            large: null,
            small: null
        },
        aboutMe: ''
    } as ProfileType

    const ProfileDataFormContainer: FC<ProfileDataFormContainerPropsType> = ({
        deActivateEditMode = () => undefined,
        editMode = true,
        profile = profileData
    }) => {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <ProfileDataForm profile={profile} deActivateEditMode={deActivateEditMode} editMode={editMode} />
                </Provider>
            </BrowserRouter>
        )
    }

    it('ProfileDataForm content should be displayed', async () => {
        render(<ProfileDataFormContainer />);
        const form = screen.getByTestId('form');
        const fullNameInput = screen.getByPlaceholderText('fullName');
        const aboutMeInput = screen.getByPlaceholderText('aboutMe');
        const lookingForAJobDescriptionInput = screen.getByPlaceholderText('lookingForAJobDescription');
        const contactsTitle = screen.getByTestId('contacts');
        const contacts = screen.getAllByTestId('contact_input');
        expect(form).toBeInTheDocument();
        expect(fullNameInput).toBeInTheDocument();
        expect(aboutMeInput).toBeInTheDocument();
        expect(lookingForAJobDescriptionInput).toBeInTheDocument();
        expect(contactsTitle).toBeInTheDocument();
        expect(contacts.length).toBeTruthy();
        expect(contacts).toHaveLength(8);
    });

    it('after unmount ProfileDataForm content should not be displayed', () => {
        const { unmount } = render(<ProfileDataFormContainer />);
        unmount();
        const form = screen.queryByTestId('form');
        const fullNameInput = screen.queryByPlaceholderText('fullName');
        const aboutMeInput = screen.queryByPlaceholderText('aboutMe');
        const lookingForAJobDescriptionInput = screen.queryByPlaceholderText('lookingForAJobDescription');
        const contactsTitle = screen.queryByTestId('contacts');
        const contacts = screen.queryAllByTestId('contact_input');
        expect(form).not.toBeInTheDocument();
        expect(fullNameInput).not.toBeInTheDocument();
        expect(aboutMeInput).not.toBeInTheDocument();
        expect(lookingForAJobDescriptionInput).not.toBeInTheDocument();
        expect(contactsTitle).not.toBeInTheDocument();
        expect(contacts).toHaveLength(0);
    });

    it('if there is not the editMode property then modal should not be displayed', () => {
        render(<ProfileDataFormContainer editMode={true} />);
        const saveButton = screen.getByText('save');
        const cancelButton = screen.getByText('cancel');
        expect(saveButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it('after click deactivate function should be called', () => {
        const mockFunc = jest.fn();
        render(<ProfileDataFormContainer editMode={true} deActivateEditMode={mockFunc} />);
        const cancelButton = screen.getByText('cancel');
        expect(cancelButton).toBeInTheDocument();
        act(() => userEvent.click(cancelButton));
        expect(mockFunc).toHaveBeenCalled();
        for (let i = 0; i < 5; i++) {
            act(() => userEvent.click(cancelButton));
        }
        expect(mockFunc).toHaveBeenCalledTimes(6);
    });

    it('check textarea aboutMe', () => {
        render(<ProfileDataFormContainer editMode={true} />);
        const aboutMeTextarea = screen.getByPlaceholderText('aboutMe');
        userEvent.type(aboutMeTextarea, 'Hello,{enter}World!');
        expect(aboutMeTextarea).toHaveValue('Hello,\nWorld!');
    })


});