import {css, cx} from '@emotion/css';
import {theme} from '../../styles/theme';
import {deepDefaults}  from '../../styles/utils';
import '../../styles/global';

const {card} = deepDefaults(theme, {
    card: {
        border: '1px solid #e5e5e5',
        padding: '16px',
        boxShadow: '0 0 20px 0 rgba(0, 0, 0, .06)',
        headerHeight: '48px',
        headerFontSize: '14px',
        bgColor: '#fff'
    },
});

export {card};

export default function makeStyles() {
    return css`
        border-radius: ${theme.borderRadius};
        background: ${card.bgColor};
        > .k-card-header {
            height: ${card.headerHeight};
            line-height: ${card.headerHeight};
            padding: 0 ${card.padding};
            > .k-card-title {
                font-size: ${card.headerFontSize};
                display: inline-block;
            }
            > .k-card-extra {
                float: right;
                height: 100%;
                display: flex;
                align-items: center;
            }
        }
            
        > .k-card-body {
            padding: 0 ${card.padding} ${card.padding};
        }

        // type
        &.k-shadow {
            box-shadow: ${card.boxShadow};
        }
        &.k-none {
            box-shadow: none;
        }
        &.k-border {
            border: ${card.border};
            > .k-card-header {
                border-bottom: ${card.border};
            }
            > .k-card-body {
                padding-top: ${card.padding};
            }
        }
        &.k-no-header {
            > .k-card-body {
                padding-top: ${card.padding};
            }
        }  
    
        // grid
        &.k-card-grid
            > .k-card-body {
                display: flex;
                padding: 0;
            }
            &.k-border
                .k-card-column:not(:last-of-type) {
                    border-right: ${card.border};
                }
    `;
}