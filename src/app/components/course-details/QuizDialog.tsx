import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SUBMITANSWER, createAPIEndpoint } from "@/lib/constants";
import { callAPI, cn } from "@/lib/utils";
import { TQuizDialog, TSubmitAnswer } from "@/types";
import { Cross2Icon, ReloadIcon } from "@radix-ui/react-icons";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function QuizDialog({
  showDialog,
  questions,
  title,
  id,
  closeQuiz,
  isMandatory,
}: TQuizDialog) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAns, setCorrectAns] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAns, setSelectedAns] = useState("");
  const [showResultView, setShowResultView] = useState(false);
  const buttonText = useRef(isMandatory ? "Next" : "Check Answer");
  const radioGroupRef =
    useRef<React.ElementRef<typeof RadioGroupPrimitive.Root>>(null);
  const resultData = useRef<TSubmitAnswer>();

  useEffect(() => {
    setSelectedAns("");
    setCorrectAns("");
  }, [currentIndex]);

  const checkAnswer = async () => {
    setIsLoading(true);
    const response = await callAPI(
      createAPIEndpoint(`${SUBMITANSWER}${id}/`),
      "POST",
      {
        question_id: "" + questions[currentIndex].id,
        selected_option: selectedAns,
      }
    );
    if (response.status === 200 || 201) {
      resultData.current = (await response.json()) as TSubmitAnswer;
      if (isMandatory) {
        if (currentIndex === questions.length - 1) {
          setShowResultView(true);
          setIsLoading(false);
          return;
        }
        setCurrentIndex((prev) => prev + 1);
      } else {
        if (currentIndex === questions.length - 1) {
          buttonText.current = "Submit";
        } else {
          buttonText.current = "Next";
        }
        setCorrectAns(resultData.current.correct_answers[0]);
      }
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={showDialog}>
      <DialogOverlay>
        <DialogContent className="max-w-5xl">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-text-primary text-base font-semibold">
              {title}
            </DialogTitle>
            <X
              className="cursor-pointer"
              onClick={() => {
                closeQuiz(false);
              }}
            ></X>
          </div>
          <div>
            {showResultView ? (
              <div className="border rounded-md p-5 flex flex-col gap-3">
                <span className="text-lg text-text-primary font-medium">
                  Quiz Completed!
                </span>
                <span className="text-base text-text-primary font-medium mt-3">
                  Your Result
                </span>
                <span className="font-normal text-sm leading-tight text-text-secondary">
                  You scored
                  <span className="font-medium text-text-primary">{` ${resultData?.current?.score}%`}</span>
                </span>

                <span className="text-base text-text-primary font-medium mt-3">
                  Certification
                </span>
                <span className="font-normal text-sm leading-tight text-text-secondary">
                  {resultData.current?.passed
                    ? "Congratulations! You have earned your certification"
                    : "Unfortunately you need to take quiz again to obtain certificate."}
                </span>

                <Button
                  className="w-36 mt-5"
                  onClick={() => {
                    if (resultData?.current?.passed) {
                      closeQuiz(true);
                    } else {
                      setCurrentIndex(0);
                      setShowResultView(false);
                    }
                  }}
                >
                  {resultData.current?.passed ? "Close" : "Retry Again"}
                </Button>
              </div>
            ) : (
              <>
                <div className="border rounded-md p-5 flex flex-col gap-3">
                  <span className="text-sm font-medium text-text-secondary">
                    {`Question ${currentIndex + 1}:`}
                  </span>
                  <span className="text-lg font-medium text-text-primary">
                    {questions[currentIndex].text}
                  </span>
                  <RadioGroup
                    ref={radioGroupRef}
                    value={selectedAns}
                    onValueChange={(e) => {
                      setSelectedAns(e);
                      setCorrectAns("");
                    }}
                  >
                    {Object.values(questions[currentIndex].options).map(
                      (value, index) => {
                        const optionKey = Object.keys(
                          questions[currentIndex].options
                        )[index];
                        return (
                          <div className="flex items-center gap-2" key={value}>
                            <RadioGroupItem
                              value={optionKey}
                              className="flex shrink-0 items-center justify-center"
                            />
                            <span
                              className={cn(
                                "text-base text-text-secondary font-medium"
                              )}
                            >
                              {value}
                            </span>
                            {Object.keys(questions[currentIndex].options)[
                              index
                            ] === correctAns && (
                              // <span className="text-xs text-green-500 font-medium">
                              //   Correct Answer
                              // </span>
                              <Check style={{ color: "green" }} />
                            )}
                            {Object.keys(questions[currentIndex].options)[
                              index
                            ] === selectedAns &&
                              correctAns &&
                              Object.keys(questions[currentIndex].options)[
                                index
                              ] !== correctAns && (
                                <Cross2Icon
                                  style={{
                                    color: "red",
                                    width: 20,
                                    height: 20,
                                  }}
                                />
                              )}
                          </div>
                        );
                      }
                    )}
                  </RadioGroup>
                  <div className="flex flex-1 justify-end">
                    <div className="flex w-[150px] h-10 justify-center items-center ">
                      {isLoading ? (
                        <ReloadIcon className="h-4 w-4 animate-spin" />
                      ) : (
                        <Button
                          className="w-[150px]"
                          disabled={selectedAns != "" ? false : true}
                          onClick={() => {
                            if (buttonText.current === "Next") {
                              if (!isMandatory) {
                                buttonText.current = "Check Answer";
                                setCurrentIndex((prev) => prev + 1);
                              } else {
                                checkAnswer();
                              }
                            } else if (buttonText.current === "Check Answer") {
                              checkAnswer();
                            } else {
                              if (!isMandatory) {
                                closeQuiz(true);
                              }
                            }
                          }}
                        >
                          {buttonText.current}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-5 justify-center">
                  <span className="font-light text-xs text-text-secondary">{`${
                    currentIndex + 1
                  } of ${questions.length} Questions`}</span>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
