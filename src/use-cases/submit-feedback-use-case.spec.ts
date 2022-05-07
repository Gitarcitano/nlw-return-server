import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackMock = jest.fn();
const sendMailMock = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackMock },
  { sendMail: sendMailMock },
);
describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'I have a bug',
      screenshot: 'data:image/png;base64,2167gtwsz127yt3721tgr',
    })).resolves.not.toThrow();

    expect(createFeedbackMock).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalled();
  });

  it('should not to be able to submit a feedback without the type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'I have a bug',
      screenshot: 'data:image/png;base64,2167gtwsz127yt3721tgr',
    })).rejects.toThrow();
  });

  it('should not to be able to submit a feedback without the comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,2167gtwsz127yt3721tgr',
    })).rejects.toThrow();
  });

  it('should not be able to submit when the screenshot is not in base 64', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'I have a bug',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
});
