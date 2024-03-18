import React, { useState, ComponentType } from 'react';
import * as Icons from '@qnet-icons/react';
import { useDebounceEffect } from 'ahooks';
import { useCopy } from 'dumi/theme';
import './demo-all.less';

const classPrefix = 'qnet-icon-doc';

type IconItem = {
  name: string;
  component: ComponentType;
};

const items: Record<'outline' | 'filled', IconItem[]> = {
  outline: [],
  filled: []
};

for (const key in Icons) {
  const component = (Icons as any)[key] as ComponentType;

  if (typeof component !== 'function') {
    continue;
  }
  if (key.includes('Outline')) {
    items.outline.push({
      name: key,
      component
    });
  } else {
    items.filled.push({
      name: key,
      component
    });
  }
}

const Demo = () => {
  const iconTypes = [
    {
      label: '线框风格',
      value: 'outline'
    },
    {
      label: '实底风格',
      value: 'filled'
    }
  ];
  const [displayedItems, setDisplayedItems] = useState<typeof items>(items);
  const [searchValue, setSearchValue] = useState<string>('');
  const [placeholder, setPlaceholder] =
    useState('输入英文关键词搜索，比如 wifi');
  const [iconType] = useState<string[]>(iconTypes.map(it => it.value));
  const [copyCode] = useCopy();
  const handleIconClick = (item: IconItem) => {
    copyCode(`<${item.name} />`);
    alert('复制成功');
  };

  useDebounceEffect(
    () => {
      setDisplayedItems({
        outline: items.outline.filter(it =>
          it.name.toLowerCase().includes(searchValue.toLowerCase())
        ),
        filled: items.filled.filter(it =>
          it.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      });
    },
    [searchValue],
    {
      wait: 200,
      leading: false,
      trailing: true
    }
  );

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-search`}>
        <input
          onFocus={() => {
            setPlaceholder('');
          }}
          onBlur={() => {
            setPlaceholder('输入英文关键词搜索，比如 wifi');
          }}
          onChange={event => setSearchValue(event.target.value.trim())}
          placeholder={placeholder}
        />
      </div>
      {iconTypes.map(type => {
        const iconType_ = type.value as 'outline' | 'filled';
        if (iconType.includes(iconType_)) {
          return (
            <React.Fragment key={iconType_}>
              {displayedItems[iconType_].length > 0 && (
                <h3>{iconType_ === 'outline' ? '线框风格' : '实底风格'}</h3>
              )}
              <div className={`${classPrefix}-card`}>
                {displayedItems[iconType_].map(item => (
                  <div
                    key={item.name}
                    className={`${classPrefix}-item`}
                    onClick={() => handleIconClick(item)}
                  >
                    <div className={`${classPrefix}-icon`}>
                      <item.component />
                    </div>
                    <div className={`${classPrefix}-label`}>{item.name}</div>
                  </div>
                ))}
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};

export default Demo;
