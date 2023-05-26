import React from 'react';
import { act } from '../../../../../config/jest/test-utils';
import { render } from '../../../../../config/jest/test-utils';
import { Dropdown, FilterableMultiSelect, Tag, DatePickerInput } from '@carbon/react';
import {
  DataTableWithFilterPanel,
  DataTableWithFilterPanelNoFilterItemsFilterKeys,
  DataTableWithFilterPanelWithSingleFilter,
} from '../examples';
import { initialRows } from '../examples/params';

jest.useFakeTimers();

const renderWrapper = ({ initialFilters, mode, disabledGroupFilter }) =>
  render(<DataTableWithFilterPanel initialFilters={initialFilters} mode={mode} disabledGroupFilter={disabledGroupFilter} />);

/*
 * NOTE: this test case corresponds to the example in the examples folder.
 * Expected results can be easily derived by interacting with Data Table's doc page.
 */

describe('DataTable.TableFilterPanel - collapsed', () => {
  test.todo('convert this enzyme unit tests to jest');
//   let wrapper;

//   beforeEach(() => {
//     jest.clearAllMocks();

//     wrapper = renderWrapper({});
//   });

//   it('initial selection tags', () => {
//     wrapper.debug()
//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel Tag')
//         .at(0)
//         .containsMatchingElement(
//           <span className="cds--tag__label">Status:Active</span>,
//         ),
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel Tag')
//         .at(1)
//         .containsMatchingElement(
//           <span className="cds--tag__label">Status:Starting</span>,
//         ),
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel Tag')
//         .at(2)
//         .containsMatchingElement(
//           <span className="cds--tag__label">Attached Groups:Maureens VM Groups</span>,
//         ),
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel Tag')
//         .at(3)
//         .containsMatchingElement(
//           <span className="cds--tag__label">Attached Groups:Andrews VM Groups</span>,
//         ),
//     ).toBe(true);

//     const startDate = new Date('2021-10-01T12:00:00.000Z');
//     const endDate = new Date('2021-10-03T23:00:00.000Z');

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel Tag')
//         .at(4)
//         .containsMatchingElement(
//           <span className="cds--tag__label">{`Created:${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}</span>,
//         ),
//     ).toBe(true);
//   });

//   it('clear one selection tag', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     wrapper
//       .container.querySelector('TableToolbarFilterPanel Tag [aria-label="Clear filter Attached Groups:Maureens VM Groups"]')
//       .simulate('click');

//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(1);
//   });

//   it('clear all filter tags', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);
//     wrapper
//       .container.querySelector('TableToolbarFilterPanel button.cds--filters-clear')
//       .simulate('click');
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(6);
//   });

//   it('clear all filter tags (excluding disabled ones)', () => {
//     const initialFilters = {
//       status: ['Disabled'],
//       attached_groups: ['g2'],
//     };
//     const modifiedWrapper = renderWrapper({
//       initialFilters,
//       disabledGroupFilter: true,
//     });

//     expect(modifiedWrapper.container.querySelector('TableBody TableRow').length).toEqual(1);

//     modifiedWrapper
//       .container.querySelector('TableToolbarFilterPanel button.cds--filters-clear')
//       .simulate('click');

//     expect(modifiedWrapper.container.querySelector('TableBody TableRow').length).toEqual(3);
//   });

//   it('clear all filter tags with keyboard', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     // no change when a key other than enter pressed
//     wrapper
//       .container.querySelector('TableToolbarFilterPanel button.cds--filters-clear')
//       .simulate('keydown', { key: 'ArrowDown' });
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     // filter cleared when enter pressed
//     wrapper
//       .container.querySelector('TableToolbarFilterPanel button.cds--filters-clear')
//       .simulate('keydown', { key: 'Enter' });
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(6);
//   });

//   it('header label not resolved - use header key', () => {
//     const initialFilters = {
//       foo: ['bar'],
//     };
//     const modifiedWrapper = renderWrapper({
//       initialFilters,
//       mode: 'batch',
//     });

//     expect(modifiedWrapper.container.querySelector('TableToolbarFilterPanel Tag').length).toEqual(
//       1,
//     );
//     expect(
//       modifiedWrapper
//         .container.querySelector('TableToolbarFilterPanel Tag')
//         .containsMatchingElement(
//           <span className="cds--tag__label">foo:bar</span>,
//         ),
//     ).toBe(true);
//   });

//   it('no selection', () => {
//     const initialFilters = {};
//     const modifiedWrapper = renderWrapper({
//       initialFilters,
//       mode: 'batch',
//     });

//     expect(modifiedWrapper.container.querySelector('TableToolbarFilterPanel Tag').length).toEqual(
//       0,
//     );
//     expect(
//       modifiedWrapper
//         .container.querySelector('TableToolbarFilterPanel button.cds--filters-clear')
//         .exists(),
//     ).toBe(false);
//   });
// });

// describe('DataTable.TableFilterPanel - batch filters', () => {
//   let wrapper;

//   beforeEach(() => {
//     jest.clearAllMocks();

//     wrapper = renderWrapper({
//       mode: 'batch',
//     });
//   });

//   it('should render filters in filter panel', () => {
//     // open panel
//     wrapper.container.querySelector('TableToolbar TableToolbarButton button').simulate('click');

      // // render Name textinput filter
      // expect(
      //   wrapper.find('TableToolbarFilterPanel').containsMatchingElement(
      //     <TextInput
      //       id="name-column"
      //       labelText="Name"
      //       light
      //     />,
      //   ),
      // ).toBe(true);
//     // render Port dropdown filter
//     expect(
//       wrapper.container.querySelector('TableToolbarFilterPanel').containsMatchingElement(
//         <Dropdown
//           id="port-column"
//           type="default"
//           label="Port"
//           titleText="Port"
//           initialSelectedItem="All"
//           disabled={false}
//           light
//           helperText=""
//           items={[
//             { id: 'All', label: 'All' },
//             { id: 3000, label: 3000 },
//             { id: 443, label: 443 },
//             { id: 80, label: 80 },
//           ]}
//         />,
//       ),
//     ).toBe(true);
// render Rule combobox filter
// expect(wrapper.find('TableToolbarFilterPanel').find('ComboBox')).toHaveLength(1);
// expect(wrapper.find('TableToolbarFilterPanel').find('ComboBox').props()).toMatchObject({
//   id: 'rule-column',
//   items: [
//     { id: 'Round robin', label: 'Round robin' },
//     { id: 'DNS delegation', label: 'DNS delegation' }
//   ],
//   type: 'default',
//   placeholder: 'Rule',
//   titleText: 'Rule',
//   columnKey: 'rule',
//   initialSelectedItem: undefined,
//   disabled: false,
//   light: true,
// });
//     // render Status multiselect filter
//     expect(
//       wrapper.container.querySelector('TableToolbarFilterPanel').containsMatchingElement(
//         <FilterableMultiSelect
//           id="status-column"
//           type="default"
//           placeholder="Status"
//           titleText="Status"
//           columnKey="status"
//           ariaLabel="Choose an item"
//           disabled={false}
//           locale="en"
//           light
//           open={false}
//           selectionFeedback="top-after-reopen"
//           initialSelectedItems={[
//             { id: 'Active', label: 'Active' },
//             { id: 'Starting', label: 'Starting' },
//           ]}
//           items={[
//             { id: 'Disabled', label: 'Disabled' },
//             { id: 'Starting', label: 'Starting' },
//             { id: 'Active', label: 'Active' },
//           ]}
//         />,
//       ),
//     ).toBe(true);

//     // render Attached Groups multiselect filter
//     expect(
//       wrapper.container.querySelector('TableToolbarFilterPanel').containsMatchingElement(
//         <FilterableMultiSelect
//           id="groups-column"
//           type="default"
//           placeholder="Attached Groups"
//           titleText="Attached Groups"
//           columnKey="attached_groups"
//           ariaLabel="Choose an item"
//           disabled={false}
//           locale="en"
//           light
//           open={false}
//           selectionFeedback="top-after-reopen"
//           initialSelectedItems={[
//             { id: 'g2', label: 'Maureens VM Groups' },
//             { id: 'g3', label: 'Andrews VM Groups' },
//           ]}
//           items={[
//             { id: 'g1', label: 'Kevins VM Groups' },
//             { id: 'g2', label: 'Maureens VM Groups' },
//             { id: 'g3', label: 'Andrews VM Groups' },
//           ]}
//         />,
//       ),
//     ).toBe(true);

//     const startDate = new Date('2021-10-01T12:00:00.000Z');
//     const endDate = new Date('2021-10-03T23:00:00.000Z');

//     // render Created date range select filter
//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel DatePickerInput')
//         .at(0)
//         .containsMatchingElement(
//           <DatePickerInput
//             id="created-column-start"
//             placeholder={startDate.toLocaleDateString()}
//             labelText="Created"
//             autoComplete="off"
//             type="text"
//             disabled={false}
//             invalid={false}
//             datePickerType="range"
//           />
//         )
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel DatePickerInput')
//         .at(1)
//         .containsMatchingElement(
//           <DatePickerInput
//             id="created-column-end"
//             placeholder={endDate.toLocaleDateString()}
//             labelText=""
//             autoComplete="off"
//             type="text"
//             disabled={false}
//             invalid={false}
//             datePickerType="range"
//           />
//         )
//     ).toBe(true);
//   });

//   it('should render buttons in filter panel', () => {
//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel .cds--filters-button-bar')
//         .containsMatchingElement(
//           <button
//             tabIndex={0}
//             className="cds--btn cds--btn--md cds--btn--secondary"
//             disabled={false}
//             type="button"
//           >
//             Clear
//           </button>,
//         ),
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel .cds--filters-button-bar')
//         .containsMatchingElement(
//           <button
//             tabIndex={0}
//             className="cds--btn cds--btn--md cds--btn--primary"
//             disabled={false}
//             type="button"
//           >
//             Apply
//           </button>,
//         ),
//     ).toBe(true);
//   });

// it('should update table upon clicking Apply - TextInput', () => {
//   // open panel
//   wrapper
//     .find('TableToolbar button.bx--table-toolbar-filter-button')
//     .simulate('click');

//   // Load Balancer 1
//   const event = {
//     target: {
//       value: 'Load Balancer 10',
//     },
//   };
//   wrapper
//     .find(
//       'TableToolbarFilterPanel [id="name-column"].bx--text-input',
//     )
//     .simulate('change', event);

//   act(() => {
//     jest.advanceTimersByTime(1);
//     wrapper.update();
//   });

//   // no changes before Apply is clicked
//   expect(wrapper.find('TableBody TableRow').length).toEqual(2);
//   wrapper
//     .find('TableToolbarFilterPanel .bx--filters-button-bar .bx--btn--primary')
//     .simulate('click');

//   // changes after Apply is clicked
//   expect(wrapper.find('TableBody TableRow').length).toEqual(0);
// });

//   it('should update table upon clicking Apply - Dropdown', () => {
//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     // open Port dropdown
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel [id="port-column"] .cds--list-box__field',
//       )
//       .simulate('click');

//     // All, 3000, 443, 80, select 3000
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel [id="port-column"] .cds--list-box__menu-item__option',
//       )
//       .at(1)
//       .simulate('click');

//     // no changes before Apply is clicked
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);
//     wrapper
//       .container.querySelector('TableToolbarFilterPanel .cds--filters-button-bar .cds--btn--primary')
//       .simulate('click');

//     // changes after Apply is clicked
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(0);
//   });

// it('should update table upon clicking Apply - ComboBox', () => {
//   // open panel
//   wrapper
//     .find('TableToolbar button.bx--table-toolbar-filter-button')
//     .simulate('click');

//   // open Rule combobox
//   wrapper
//     .find(
//       'TableToolbarFilterPanel ComboBox[id="rule-column"] ListBoxTrigger',
//     )
//     .simulate('click');

//   // Round robin, DNS deligation
//   wrapper
//     .find(
//       'TableToolbarFilterPanel ComboBox[id="rule-column"] .bx--list-box__menu-item__option',
//     )
//     .at(1)
//     .simulate('click');

//   // no changes before Apply is clicked
//   expect(wrapper.find('TableBody TableRow').length).toEqual(2);
//   wrapper
//     .find('TableToolbarFilterPanel .bx--filters-button-bar .bx--btn--primary')
//     .simulate('click');

//   // changes after Apply is clicked
//   expect(wrapper.find('TableBody TableRow').length).toEqual(1);
// });

//   it('should update table upon clicking Apply - Multi Select', () => {
//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     // open Status dropdown
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel [id="status-column"] [aria-label="Open menu"]',
//       )
//       .simulate('click');

//     // Active, Disabled, Starting
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel [id="status-column"] .cds--list-box__menu-item__option',
//       )
//       .at(1)
//       .simulate('click');

//     // no changes before Apply is clicked
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);
//     wrapper
//       .container.querySelector('TableToolbarFilterPanel .cds--filters-button-bar .cds--btn--primary')
//       .simulate('click');

//     // changes after Apply is clicked
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(3);
//   });

//   it('should clear selections upon clicking Clear', () => {
//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     // no changes before Clear is clicked
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel .cds--filters-button-bar .cds--btn--secondary',
//       )
//       .simulate('click');

//     // all filter selections cleared, showing all rows
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(6);
//   });

//   it('should handle change in rows prop', async () => {
//     // prop changes, a new row not matching the filter is added
//     await wrapper.setProps({
//       rows: [
//         ...initialRows,
//         {
//           id: 'g',
//           name: 'Load Balancer 7',
//           protocol: 'HTTPS',
//           port: 3000,
//           rule: 'Round robin',
//           attached_groups: 'Kevins VM Groups',
//           group_id: 'g1',
//           status: 'Starting',
//           created_at: '2021-10-02T16:48:00.000Z',
//         },
//       ],
//     });
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     // prop changes, a new row matching the filter is added
//     await wrapper.setProps({
//       rows: [
//         ...initialRows,
//         {
//           id: 'h',
//           name: 'Load Balancer 8',
//           protocol: 'HTTPS',
//           port: 443,
//           rule: 'Round robin',
//           attached_groups: 'Maureens VM Groups',
//           group_id: 'g2',
//           status: 'Starting',
//           created_at: '2021-10-02T16:48:00.000Z',
//         },
//       ],
//     });
//     wrapper.update();
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(3);

//     // now it should have 7 rows in total when all filters cleared
//     wrapper
//       .container.querySelector('TableToolbarFilterPanel button.cds--filters-clear')
//       .simulate('click');
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(7);
//   });
// });

// describe('DataTable.TableFilterPanel - live filters', () => {
//   let wrapper;

//   beforeEach(() => {
//     jest.clearAllMocks();

//     wrapper = renderWrapper({
//       mode: 'live',
//     });
//   });

//   it('should render filters in filter panel', () => {
//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

// render Status textinput filter
// expect(
//   wrapper.find('TableToolbarFilterPanel').containsMatchingElement(
//     <TextInput
//       id="name-column"
//       labelText="Name"
//       light
//     />,
//   ),
// ).toBe(true);

//     const dropdownProps = wrapper
//       .container.querySelector('TableToolbarFilterPanel Dropdown')
//       .props();

//     // render Port dropdown filter
//     expect(dropdownProps.id).toBe('port-column');
//     expect(dropdownProps.type).toBe('default');
//     expect(dropdownProps.label).toBe('Port');
//     expect(dropdownProps.titleText).toBe('Port');
//     expect(dropdownProps.initialSelectedItem).toBe('All');
//     expect(dropdownProps.disabled).toBe(false);
//     expect(dropdownProps.light).toBe(true);
//     expect(dropdownProps.helperText).toBe('');

//     // render Status multiselect filter
//     expect(
//       wrapper.container.querySelector('TableToolbarFilterPanel').containsMatchingElement(
//         <FilterableMultiSelect
//           id="status-column"
//           type="default"
//           placeholder="Status"
//           titleText="Status"
//           columnKey="status"
//           ariaLabel="Choose an item"
//           disabled={false}
//           locale="en"
//           light
//           open={false}
//           selectionFeedback="top-after-reopen"
//           initialSelectedItems={[
//             { id: 'Active', label: 'Active' },
//             { id: 'Starting', label: 'Starting' },
//           ]}
//           items={[
//             { id: 'Disabled', label: 'Disabled' },
//             { id: 'Starting', label: 'Starting' },
//             { id: 'Active', label: 'Active' },
//           ]}
//         />,
//       ),
//     ).toBe(true);

//     // render Attached Groups multiselect filter
//     expect(
//       wrapper.container.querySelector('TableToolbarFilterPanel').containsMatchingElement(
//         <FilterableMultiSelect
//           id="groups-column"
//           type="default"
//           placeholder="Attached Groups"
//           titleText="Attached Groups"
//           columnKey="attached_groups"
//           ariaLabel="Choose an item"
//           disabled={false}
//           locale="en"
//           light
//           open={false}
//           selectionFeedback="top-after-reopen"
//           initialSelectedItems={[
//             { id: 'g2', label: 'Maureens VM Groups' },
//             { id: 'g3', label: 'Andrews VM Groups' },
//           ]}
//           items={[
//             { id: 'g1', label: 'Kevins VM Groups' },
//             { id: 'g2', label: 'Maureens VM Groups' },
//             { id: 'g3', label: 'Andrews VM Groups' },
//           ]}
//         />,
//       ),
//     ).toBe(true);
//   });

//   it('should render buttons in filter panel', () => {
//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel .cds--filters-button-bar')
//         .containsMatchingElement(
//           <button
//             tabIndex={0}
//             className="cds--btn cds--btn--md cds--btn--secondary"
//             disabled={false}
//             type="button"
//           >
//             Clear
//           </button>,
//         ),
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel .cds--filters-button-bar')
//         .containsMatchingElement(
//           <button
//             tabIndex={0}
//             className="cds--btn cds--btn--md cds--btn--primary"
//             disabled={false}
//             type="button"
//           >
//             Done
//           </button>,
//         ),
//     ).toBe(true);
//   });

// it('should update table upon filter changes - TextInput', () => {
//   expect(wrapper.find('TableBody TableRow').length).toEqual(2);

//   // open panel
//   wrapper
//     .find('TableToolbar button.bx--table-toolbar-filter-button')
//     .simulate('click');

//   // Load Balancer 1
//   const event = {
//     target: {
//       value: 'Load Balancer 10',
//     },
//   };
//   wrapper
//     .find(
//       'TableToolbarFilterPanel [id="name-column"].bx--text-input',
//     )
//     .simulate('change', event);

//   act(() => {
//     jest.advanceTimersByTime(301);
//     wrapper.update();
//   });

//   // changes reflected upon filter change
//   expect(wrapper.find('TableBody TableRow').length).toEqual(0);
// });

//   it('should update table upon filter changes - Dropdown', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     // open dropdown
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel Dropdown[id="port-column"] .cds--list-box__field',
//       )
//       .simulate('click');

//     // All, 3000, 443, 80, select 3000
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel Dropdown[id="port-column"] .cds--list-box__menu-item__option',
//       )
//       .at(1)
//       .simulate('click');

//     // changes reflected upon filter change
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(0);
//   });

// it('should update table upon filter changes - ComboBox', () => {
//   expect(wrapper.find('TableBody TableRow').length).toEqual(2);

//   // open panel
//   wrapper
//     .find('TableToolbar button.bx--table-toolbar-filter-button')
//     .simulate('click');

//   // open Rule combobox
//   wrapper
//     .find(
//       'TableToolbarFilterPanel ComboBox[id="rule-column"] ListBoxTrigger',
//     )
//     .simulate('click');

//   // Round robin, DNS deligation
//   wrapper
//     .find(
//       'TableToolbarFilterPanel ComboBox[id="rule-column"] .bx--list-box__menu-item__option',
//     )
//     .at(1)
//     .simulate('click');

//   // changes reflected upon filter change
//   expect(wrapper.find('TableBody TableRow').length).toEqual(1);
// });

//   it('should update table upon filter changes - Multi Select', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     // open multiselect select dropdown
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel [id="groups-column"] [aria-label="Open menu"]',
//       )
//       .simulate('click');

//     // Andrews, Kevins, Maureena, deselect Andrews
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel [id="groups-column"] .cds--list-box__menu-item__option',
//       )
//       .at(0)
//       .simulate('click');

//     // changes reflected upon filter change
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(1);
//   });

//   it('should clear selections upon clicking Clear', () => {
//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     // no changes before Clear is clicked
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel .cds--filters-button-bar .cds--btn--secondary',
//       )
//       .simulate('click');

//     // all filter selections cleared, showing all rows
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(6);
//   });

//   it('should close panel upon clicking Done', () => {
//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(TextInput)
//     .exists(),
// ).toBe(true);

// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(ComboBox)
//     .exists(),
// ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(FilterableMultiSelect)
//         .exists(),
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(Dropdown)
//         .exists(),
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(Tag)
//         .exists(),
//     ).toBe(false);

//     wrapper
//       .container.querySelector('TableToolbarFilterPanel .cds--filters-button-bar .cds--btn--primary')
//       .simulate('click');
// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(ComboBox)
//     .exists(),
// ).toBe(false);


// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(TextInput)
//     .exists(),
// ).toBe(false);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(FilterableMultiSelect)
//         .exists(),
//     ).toBe(false);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(Dropdown)
//         .exists(),
//     ).toBe(false);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(Tag)
//         .exists(),
//     ).toBe(true);
//   });

//   it('should toggle panel open / close', () => {
//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(FilterableMultiSelect)
//         .exists(),
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(Dropdown)
//         .exists(),
//     ).toBe(true);

//     // close panel by clicking filter button again
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(ComboBox)
//     .exists(),
// ).toBe(true);

// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(TextInput)
//     .exists(),
// ).toBe(false);


//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(FilterableMultiSelect)
//         .exists(),
//     ).toBe(false);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(Dropdown)
//         .exists(),
//     ).toBe(false);
//   });

//   it('should close panel when clicked outside the table', () => {
//     const map = {};
//     document.addEventListener = jest.fn((event, cb) => {
//       map[event] = cb;
//     });

//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(TextInput)
//     .exists(),
// ).toBe(true);

// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(ComboBox)
//     .exists(),
// ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(FilterableMultiSelect)
//         .exists(),
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(Dropdown)
//         .exists(),
//     ).toBe(true);

//     // panel does not close when clicked inside the table
//     map.click({
//       target: {
//         isConnected: true,
//         closest: () => true,
//       },
//     });
//     wrapper.update();

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(FilterableMultiSelect)
//         .exists(),
//     ).toBe(true);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(Dropdown)
//         .exists(),
//     ).toBe(true);

//   // panel does not close if clicked target is no longer on the page
//   map.click({
//     target: {
//       isConnected: false,
//       closest: () => true,
//     },
//   });
//   wrapper.update();

// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(TextInput)
//     .exists(),
// ).toBe(true);

// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(TextInput)
//     .exists(),
// ).toBe(true);

// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(ComboBox)
//     .exists(),
// ).toBe(true);


//   expect(
//     wrapper
//       .container.querySelector('TableToolbarFilterPanel')
//       .container.querySelector(FilterableMultiSelect)
//       .exists(),
//   ).toBe(true);

//   expect(
//     wrapper
//       .container.querySelector('TableToolbarFilterPanel')
//       .container.querySelector(Dropdown)
//       .exists(),
//   ).toBe(true);

//     // panel closes when clicked outside the table
//     act(() => {
//       map.click({
//         target: {
//           isConnected: true,
//           closest: () => false,
//           className: '',
//         },
//       });
//     });
//     wrapper.update();

// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(TextInput)
//     .exists(),
// ).toBe(false);

//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(FilterableMultiSelect)
//         .exists(),
//     ).toBe(false);
// expect(
//   wrapper
//     .find('TableToolbarFilterPanel')
//     .find(ComboBox)
//     .exists(),
// ).toBe(false);
//     expect(
//       wrapper
//         .container.querySelector('TableToolbarFilterPanel')
//         .container.querySelector(Dropdown)
//         .exists(),
//     ).toBe(false);
//   });

// it('should update table upon filter changes - TextInput', () => {
//   expect(wrapper.find('TableBody TableRow').length).toEqual(2);

//   // open panel
//   wrapper
//     .find('TableToolbar button.bx--table-toolbar-filter-button')
//     .simulate('click');

//   // Load Balancer 1
//   const event = {
//     target: {
//       value: 'Load Balancer 10',
//     },
//   };
//   wrapper
//     .find(
//       'TableToolbarFilterPanel [id="name-column"].bx--text-input',
//     )
//     .simulate('change', event);

//   act(() => {
//     jest.advanceTimersByTime(301);
//     wrapper.update();
//   });

//   // changes reflected upon filter change
//   expect(wrapper.find('TableBody TableRow').length).toEqual(0);
// });

//   it('should handle change in rows prop', async () => {
//     // prop changes, a new row not matching the filter is added
//     await wrapper.setProps({
//       rows: [
//         ...initialRows,
//         {
//           id: 'g',
//           name: 'Load Balancer 7',
//           protocol: 'HTTPS',
//           port: 3000,
//           rule: 'Round robin',
//           attached_groups: 'Kevins VM Groups',
//           group_id: 'g1',
//           status: 'Starting',
//           created_at: '2021-10-02T16:48:00.000Z',
//         },
//       ],
//     });
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     // prop changes, a new row matching the filter is added
//     await wrapper.setProps({
//       rows: [
//         ...initialRows,
//         {
//           id: 'h',
//           name: 'Load Balancer 8',
//           protocol: 'HTTPS',
//           port: 443,
//           rule: 'Round robin',
//           attached_groups: 'Maureens VM Groups',
//           group_id: 'g2',
//           status: 'Starting',
//           created_at: '2021-10-02T16:48:00.000Z',
//         },
//       ],
//     });
//     wrapper.update();
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(3);

//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     // now it should have 7 rows in total when all filters cleared
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel .cds--filters-button-bar .cds--btn--secondary',
//       )
//       .simulate('click');
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(7);
//   });
// });

// describe('DataTable.TableFilterPanel - no filter items, no filter keys (backward compatibility)', () => {
//   let wrapper;

//   beforeEach(() => {
//     jest.clearAllMocks();

//     wrapper = render(<DataTableWithFilterPanelNoFilterItemsFilterKeys />);
//   });

//   it('initial selection tags', () => {
//     expect(wrapper
//       .container.querySelector('TableToolbarFilterPanel Tag')
//       .at(0)
//       .containsMatchingElement(
//         <span className="cds--tag__label">Status:Active</span>,
//       ),
//     ).toBe(true);

//     expect(wrapper
//       .container.querySelector('TableToolbarFilterPanel Tag')
//       .at(1)
//       .containsMatchingElement(
//         <span className="cds--tag__label">Status:Starting</span>,
//       ),
//     ).toBe(true);

//     expect(wrapper
//       .container.querySelector('TableToolbarFilterPanel Tag')
//       .at(2)
//       .containsMatchingElement(
//         <span className="cds--tag__label">Attached Groups:Maureens VM Groups</span>,
//       ),
//     ).toBe(true);
//   });

//   it('clear one selection tag', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     wrapper
//       .container.querySelector('TableToolbarFilterPanel Tag [aria-label="Clear filter Attached Groups:Maureens VM Groups"]')
//       .simulate('click');

//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(4);
//   });

//   it('clear all filter tags', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);
//     wrapper
//       .container.querySelector('TableToolbarFilterPanel button.cds--filters-clear')
//       .simulate('click');
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(6);
//   });

//   it('should update table upon filter changes - Dropdown', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     // open dropdown
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel Dropdown[id="port-column"] .cds--list-box__field',
//       )
//       .simulate('click');

//     // All, 3000, 443, 80, select 3000
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel Dropdown[id="port-column"] .cds--list-box__menu-item__option',
//       )
//       .at(1)
//       .simulate('click');

//     // changes reflected upon filter change
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(0);
//   });
// it('should update table upon filter changes - ComboBox', () => {
//   expect(wrapper.find('TableBody TableRow').length).toEqual(2);

//   // open panel
//   wrapper
//     .find('TableToolbar button.bx--table-toolbar-filter-button')
//     .simulate('click');

//   // open Rule combobox
//   wrapper
//     .find(
//       'TableToolbarFilterPanel ComboBox[id="rule-column"] ListBoxTrigger',
//     )
//     .simulate('click');

//   // Round robin, DNS deligation
//   wrapper
//     .find(
//       'TableToolbarFilterPanel ComboBox[id="rule-column"] .bx--list-box__menu-item__option',
//     )
//     .at(1)
//     .simulate('click');

//   // changes reflected upon filter change
//   expect(wrapper.find('TableBody TableRow').length).toEqual(0);
// });

//   it('should update table upon filter changes - Multi Select', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     // open panel
//     wrapper
//       .container.querySelector('TableToolbar button.cds--table-toolbar-filter-button')
//       .simulate('click');

//     // open Attached Groups dropdown
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel [id="groups-column"] [aria-label="Open menu"]',
//       )
//       .simulate('click');

//     // Andrews, Kevins, Maureens
//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel [id="groups-column"] .cds--list-box__menu-item__option',
//       )
//       .at(0)
//       .simulate('click');

//     // rows updated
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(4);
//   });
// });

// describe('DataTable.TableFilterPanel - one filter only', () => {
//   let wrapper;

//   beforeEach(() => {
//     jest.clearAllMocks();

//     wrapper = render(<DataTableWithFilterPanelWithSingleFilter initialFilters={{
//       status: ['Active'],
//     }} />);
//   });

//   it('initial selection tags', () => {
//     expect(wrapper
//       .container.querySelector('TableToolbarFilterPanel Tag')
//       .at(0)
//       .containsMatchingElement(
//         <span className="cds--tag__label">Status:Active</span>,
//       ),
//     ).toBe(true);
//   });

//   it('clear all filter tags', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);
//     wrapper
//       .container.querySelector('TableToolbarFilterPanel button.cds--filters-clear')
//       .simulate('click');
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(6);
//   });

//   it('should update table upon filter changes - Multi Select', () => {
//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(2);

//     wrapper.container.querySelector('TableToolbar TableToolbarButton button').simulate('click');

//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel [id="status-column"] [aria-label="Open menu"]',
//       )
//       .simulate('click');

//     wrapper
//       .container.querySelector(
//         'TableToolbarFilterPanel [id="status-column"] .cds--list-box__menu-item__option',
//       )
//       .at(2)
//       .simulate('click');

//     expect(wrapper.container.querySelector('TableBody TableRow').length).toEqual(4);
//   });
})