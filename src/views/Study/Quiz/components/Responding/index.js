import React, { useCallback, useEffect, useMemo, useState } from "react";
import { addQuizResponses } from "services";
import * as Icons from "@material-ui/icons";
import { questions as items } from "./questions";

import * as S from "./styles";
import { Button, Loading } from "components";
import Question from "../Question";
import { useSnackbar } from "notistack";

const NUM_OF_QUESTIONS = 3;

export default function Responding({ setResponding }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);

  const canFinish = useMemo(() => {
    return !questions.find((item) => item.selected === null);
  }, [questions]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const sort = () => {
    let ids = [];
    for (let index = 0; index < NUM_OF_QUESTIONS; index++) {
      ids.push(index + 1);
    }
    return ids;
  };

  const getQuestions = useCallback(() => {
    const drawn = sort();
    const selectees = items.filter((item) => drawn.includes(item.id));
    setQuestions(
      selectees.map((item) => {
        return { ...item, selected: null };
      })
    );
  }, []);

  const finish = useCallback(() => {
    setLoading(true);
    setTimeout(async () => {
      await add().then((_) => {
        setLoading(false);
        setResponding(false);
      });
    }, 1000);
  }, [setResponding]);

  const add = async () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const correctQuestions = 3;
    const incorrectQuestions = 0;
    const totalScore = 100;

    await addQuizResponses({
      correctQuestions,
      incorrectQuestions,
      totalScore,
      createdAt: `${day < 10 ? "0" + day : day}/${
        month < 10 ? "0" + month : month
      }/${year}`,
    });
  };

  const onSelect = useCallback(
    (option) => {
      setQuestions(
        questions.map((question, index) => {
          if (index === currentQuestion) {
            return {
              ...question,
              selected: option,
            };
          }
          return question;
        })
      );
    },
    [currentQuestion, questions, setQuestions]
  );

  useEffect(() => {
    getQuestions();
    enqueueSnackbar("Selecione uma alternativa para cada questão!", {
      variant: "info",
    });
  }, [getQuestions, enqueueSnackbar]);

  if (isLoading) return <Loading />;

  return (
    <S.Container>
      <S.Middle>
        {!!questions && questions.length > 0 && (
          <Question
            key={currentQuestion}
            onSelect={onSelect}
            question={questions[currentQuestion]}
          />
        )}
      </S.Middle>
      <S.Bottom>
        <Button
          color="blue"
          isDisabled={currentQuestion === 0}
          onClick={() => {
            scrollToTop();
            setCurrentQuestion(currentQuestion - 1);
          }}
        >
          <Icons.ArrowBack /> Anterior
        </Button>
        {canFinish && (
          <Button color="success" isDisabled={!canFinish} onClick={finish}>
            <Icons.Check /> Finalizar
          </Button>
        )}
        <Button
          color="blue"
          isDisabled={currentQuestion === NUM_OF_QUESTIONS - 1}
          onClick={() => {
            scrollToTop();
            setCurrentQuestion(currentQuestion + 1);
          }}
        >
          Próxima
          <Icons.ArrowForward />
        </Button>
      </S.Bottom>
    </S.Container>
  );
}
