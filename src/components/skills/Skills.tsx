import { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/system'
import { RefType } from '../../utils/type'
import { Slide } from '@mui/material'
import MainSKill from './MainSkill'
import { skills, mainSkills } from '../../data'
import Grid from '@mui/material/Grid'
import Skill from './Skill'

const Skills = ({ skillsOffsetTop }: RefType) => {

    const SkillsStyle = styled('div')({
        width: '100%',
        margin: 'auto',
    })

    const SectionHeader = styled('h1')(({theme}) => ({
        textAlign: 'center',
        [theme.breakpoints.up('xl')]: {
            fontSize: '7rem',
        },
        [theme.breakpoints.down('xl')]: {
            fontSize: '5rem'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
    }))

    const MarginDiv = styled('div')({
        width: '100%',
        marginTop: '5rem'
    })

    const SkillHeader = styled('h1')({
        marginLeft: '1rem'
    })

    const [hideSkills, setHideSkills] = useState(true);
    const scrollRef: any = useRef()

    const yScrollEvent = () => {
        const scroll = scrollRef.current.getBoundingClientRect()
        setHideSkills(scroll.top >= skillsOffsetTop!.current.offsetTop - (skillsOffsetTop!.current.offsetTop / 2))
    }



    useEffect(() => {
        if (!scrollRef.current) return;
        window.addEventListener("scroll", yScrollEvent)
        return () => {
            window.removeEventListener("scroll", yScrollEvent)
        };
    });

    return (
        <SkillsStyle ref={scrollRef}>
            <SectionHeader>Skills</SectionHeader>
            <SkillHeader>Main SKills</SkillHeader>
            <Slide direction="down" in={!hideSkills}>
                <Grid container style={{justifyContent:'center'}}>
                        {
                            Object.keys(mainSkills)
                                .map((key) => mainSkills[key])
                                .map((data) => (
                                    <Grid item sm={12} md={12} xl={6}>
                                        <MainSKill data={data} key={data.skillName}/>
                                    </Grid>
                                ))
                        }
                    <MarginDiv>
                        <SkillHeader>Others</SkillHeader>
                    </MarginDiv>
                        {
                            Object.keys(skills)
                            .map((key) => skills[key])
                            .map((data) => (
                                <Grid item sm={4} md={2} xl={2}>
                                    <Skill data={data} key={data.skillName}/>
                                </Grid>
                            ))
                        }
                </Grid>
            </Slide>
        </SkillsStyle>
    )
}

export default Skills