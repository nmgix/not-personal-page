import { useEffect, useRef, useState } from "react";
import styles from "./boundary.module.scss";
import { Image } from "@/components/Generic/Image";
// import imgdata from "./dudeimg.txt";
// `data:image/webp;base64,${atob(imgdata)}`
import img from "./g2325dfwe3.webp";
import { Button } from "@/components/Generic/Buttons/Default/DefaultButton";
import classnames from "classnames";

const textAnimationInterval = 50;
const textAnimationCallbackDelay = 2000;
const rendeSceneTimeout = 3000;
const renderControlsTimeout = 2000;

type EasterEggProps = {
  active: boolean;
  setFoundOut: (found: boolean) => void;
  since: Date | undefined;
};

type Controls = {
  [phrase: string]: ControlEndPhrase | ControlDefaultPhrase;
};

type ControlEndPhrase = { author: string; phrase: () => string | string[]; beforeTrigger?: () => void };
type ControlDefaultPhrase = {
  author: string;
  phrase: () => string | string[];
  beforeTrigger?: () => void;
  afterTrigger?: () => void;
  randomPhrase?: true;
} & ControlReplies;

type ControlReplies = RepliesKeys | NextKey;
type RepliesKeys = { repliesKeys: { text: string | string[]; key: string }[] };
type NextKey = { nextKey: string | string[] };

const RenderDialog = ({
  currentPhrase,
  setCurrentPhrase,
  controlsOptions
}: {
  currentPhrase: ControlEndPhrase | ControlDefaultPhrase;
  setCurrentPhrase: (phrase: ControlEndPhrase | ControlDefaultPhrase) => void;
  controlsOptions: Controls;
}) => {
  //   хз чё делать при перерендере если controlsOptions значения поменяются (стейт), мемо делать не буду

  const getString = (reply: string | string[]) => {
    if (typeof reply == "string") return reply;
    else return reply[Math.floor(Math.random() * reply.length)];
  };

  const [renderControls, setRenderControls] = useState(false);
  let pRef = useRef<HTMLParagraphElement>(null); //придтёся в компонент вытаскивать
  let timeoutRef = useRef<NodeJS.Timeout>(null);
  const animationInterval = useRef<NodeJS.Timeout>(undefined); // на всякий
  const animateText = (text: string, cb: () => void): void => {
    let i = 0;
    if (pRef.current === null) {
      return;
    }
    clearTimeout(timeoutRef.current!);
    pRef.current.innerHTML = "";
    animationInterval.current = setInterval(function () {
      //   тут можно shake добавлять родителю через ref
      if (pRef.current === null) {
        return;
      }
      pRef.current.innerHTML += text.charAt(i);
      i++;
      if (i > text.length) {
        if (animationInterval.current) clearInterval(animationInterval.current);
        timeoutRef.current = setTimeout(cb, textAnimationCallbackDelay);
      }
    }, textAnimationInterval);
  };

  const mapPhrase = (currPhrase: ControlEndPhrase | ControlDefaultPhrase) => {
    if (currPhrase?.phrase === undefined) return console.log("no phrase lol, voiding render");
    const phrase = currPhrase.phrase();

    const afterPhrase =
      (currPhrase as NextKey)?.nextKey !== undefined
        ? () => setCurrentPhrase(controlsOptions[getString((currPhrase as NextKey).nextKey)])
        : () => setRenderControls(true);

    //   если phrase строчка или нужно взять одну рандомную
    if (typeof phrase == "string" || (currentPhrase as ControlDefaultPhrase)?.randomPhrase == true) {
      animateText(getString(phrase), afterPhrase);
      if ((currentPhrase as ControlDefaultPhrase)?.afterTrigger !== undefined) (currentPhrase as ControlDefaultPhrase).afterTrigger!();
    } else {
      //   иначе промапать каждый ответ
      const recoursiveMap = (arrLeft: string[], result: () => void) => {
        if (arrLeft.length == 0) return result();
        else {
          let el = arrLeft.shift()!;
          return recoursiveMap(arrLeft, () => animateText(el, result));
        }
      };
      // он два раза инверсиурется, внутри рекурсивных вызовов получается реверс вызов, т.е. от последнего до первого и .reverse() в начале мы отменяем реверс, короче получается нормальный порядок
      recoursiveMap(phrase.reverse(), () => {
        if ((currentPhrase as ControlDefaultPhrase)?.afterTrigger !== undefined) (currentPhrase as ControlDefaultPhrase).afterTrigger!();
        afterPhrase();
      });
    }
  };
  useEffect(() => {
    if (currentPhrase.beforeTrigger !== undefined) currentPhrase.beforeTrigger();
    setRenderControls(false);
    mapPhrase(currentPhrase);

    return () => {
      clearInterval(animationInterval.current!);
    };
  }, [currentPhrase]);

  return (
    <div className={styles.dialogWindow}>
      <h3 className={styles.phraseAuthor}>{currentPhrase.author}</h3>
      <p className={styles.phrase} ref={pRef} />
      {renderControls === true && (
        <div className={styles.dialogControls}>
          {(currentPhrase as RepliesKeys)?.repliesKeys?.map((reply, idx) => (
            <Button
              key={idx}
              externalClassnames={styles.reply}
              title={`reply no.${idx + 1}`}
              onClick={() => setCurrentPhrase(controlsOptions[reply.key])}>
              {getString(reply.text)}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

const Boundary = ({ setFoundOut, since }: { setFoundOut: (found: boolean) => void; since: Date | undefined }) => {
  const [controlsState, setControlsState] = useState(false); //temporary
  useEffect(() => {
    setTimeout(() => setControlsState(true), renderControlsTimeout);
  }, []);

  const [localsState, setLocalsState] = useState({ name: "Local", angerLevel: 0 });

  // gpt code
  function formatTimeSince(startDate: Date) {
    const now = new Date(); // Текущая дата и время
    const diffInMilliseconds = now.getTime() - startDate.getTime(); // Разница в миллисекундах
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000); // Разница в секундах
    //     // Константы для интервалов времени
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute; // 3600
    const secondsInDay = 24 * secondsInHour; // 86400
    const secondsInYear = 365 * secondsInDay; // 31536000

    // Определяем интервал и форматируем вывод
    switch (true) {
      case diffInSeconds < secondsInMinute:
        return `${diffInSeconds} sec${diffInSeconds !== 1 ? "s" : ""}`;
      case diffInSeconds < secondsInHour:
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes} min${minutes !== 1 ? "s" : ""}`;
      case diffInSeconds < secondsInDay:
        const hours = Math.floor(diffInSeconds / secondsInHour);
        return `${hours} hour${hours !== 1 ? "s" : ""}`;
      case diffInSeconds < secondsInYear:
        const days = Math.floor(diffInSeconds / secondsInDay);
        return `${days} day${days !== 1 ? "s" : ""}`;
      default:
        const years = Math.floor(diffInSeconds / secondsInYear);
        return `${years} year${years !== 1 ? "s" : ""}`;
    }
  }

  const controlsOptions: Controls = {
    intro: {
      author: "You",
      phrase: () => "Where am i?",
      nextKey: "local" // тут должен быть local, просто сейчас дебаг
    },
    local: {
      author: localsState.name,
      phrase: () => "Haha, new wanderer. Welcome",
      repliesKeys: [
        { text: "What is this place?", key: "whatplace1" },
        { text: "What are you doing?", key: "whatlocaldoes" }
      ]
    },
    whatplace1: {
      author: "You",
      phrase: () => "What is this place? I got here when I pulled the hidden button",
      nextKey: "thisplaceis"
    },
    whatlocaldoes: {
      author: localsState.name,
      phrase: () => [
        since !== undefined
          ? //   проблема в том что formateDate каждый раз комплится при обновлении переменной, phrase лучше в коллбек обернуть, наверное
            `Welp, don't you see? Chilling i guess. By the way, iirc you are sitting here for ${formatTimeSince(since)}, yeah?`
          : "Good question, i would answer but...",
        "Huh, nevermind"
      ], //(change to  for)
      nextKey: "thisplaceis"
    },
    thisplaceis: {
      author: localsState.name,
      phrase: () => "Yeah, this place is strange for newcomers like you, i wouldnt call it  limbo, lol",
      repliesKeys: [{ text: ["So, what are you doing here?", "And what are you doing here?"], key: "chilling" }]
    },
    chilling: {
      author: localsState.name,
      phrase: () => ["Chilling, i guess", "Just chilling", "Was sleeping", "Nothing -_-", "Thinking about many things"],
      randomPhrase: true,
      beforeTrigger: () => {
        // console.log("before trigger works");
        if (localsState.angerLevel > 3) {
          setCurrentPhrase(controlsOptions["getkicked"]);
          setLocalsState(prev => ({ ...prev, angerLevel: prev.angerLevel > 0 ? prev.angerLevel - 1 : 0 }));
        }
      },
      afterTrigger: () => setLocalsState(prev => ({ ...prev, angerLevel: prev.angerLevel + 1 })),
      nextKey: "questionshub"
    },
    questionshub: {
      author: "You",
      phrase: () => ["._.", "-_-", "Im bored"],
      randomPhrase: true,
      repliesKeys: [
        { text: ["So, what are you doing here?", "And what are you doing here?"], key: "chilling" },
        { text: "I dont like this place", key: "howgetout" }
      ]
    },
    howgetout: {
      author: "You",
      phrase: () => "How do i get out of here?",
      nextKey: ["getoutanswer", "getoutanswer2"]
    },
    getoutanswer: {
      author: localsState.name,
      phrase: () => "Leave page, lol",
      nextKey: "rollback"
    },
    rollback: {
      author: localsState.name,
      phrase: () => "bye-bye",
      beforeTrigger: () => setFoundOut(false)
    },
    getoutanswer2: {
      author: localsState.name,
      phrase: () => "Idk, just chill here, you will solve it somehow later",
      nextKey: "questionshub"
    },
    getkicked: {
      author: localsState.name,
      phrase: () => `You know what? U asked me "what are you doing here" ${localsState.angerLevel + 1} times, Enough, get out of here`,
      afterTrigger: () => setFoundOut(false)
    }
  };

  const [currentPhrase, setCurrentPhrase] = useState<ControlEndPhrase | ControlDefaultPhrase>();

  useEffect(() => {
    setCurrentPhrase(controlsOptions["intro"]);
  }, []);

  return (
    <div className={styles.scene}>
      {controlsState && (
        <div className={styles.controls}>
          {currentPhrase && <RenderDialog currentPhrase={currentPhrase} controlsOptions={controlsOptions} setCurrentPhrase={setCurrentPhrase} />}
        </div>
      )}
      <Image externalClassnames={styles.dudeChilling} src={img} alt='dude chilling' size={{ width: 200, height: 200 }} />
    </div>
  );
};

export const BoundaryRender = ({ active, setFoundOut, since }: EasterEggProps) => {
  const [sceneOpened, setSceneOpened] = useState(false);
  useEffect(() => {
    if (active) {
      setTimeout(() => setSceneOpened(true), rendeSceneTimeout);
      // setSceneOpened(true);
    }
  }, [active]);

  return (
    <div className={styles.boundary}>
      <div className={classnames(styles.wrapper, !sceneOpened && styles.wrapperActive)}>
        {sceneOpened && <Boundary since={since} setFoundOut={setFoundOut} />}
      </div>
    </div>
  );
};
