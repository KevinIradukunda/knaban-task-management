import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../../model/boardstate.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/app.state';
import { v4 as uuidv4 } from 'uuid';
import * as BoardActions from '../../store/boards/board.action';

@Component({
  selector: 'app-addboardmodal',
  templateUrl: './addboardmodal.component.html',
  styleUrl: './addboardmodal.component.css',
})
export class AddboardmodalComponent {
  @Input() existingBoard: Board | null = null;
  @Output() close = new EventEmitter<void>();

  addBoardForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.addBoardForm = this.fb.group({
      boardName: ['', [Validators.required, Validators.minLength(3)]],
      columns: this.fb.array([this.createColumn()]),
    });
  }

  ngOnInit(): void {
    if (this.existingBoard) {
      this.addBoardForm.patchValue({
        boardName: this.existingBoard.name,
      });
      this.setColumnsForExistingBoard();
    }
  }

  get columns(): FormArray {
    return this.addBoardForm.get('columns') as FormArray;
  }

  createColumn(): FormGroup {
    return this.fb.group({
      id: [uuidv4()],
      name: ['', Validators.required],
    });
  }

  setColumnsForExistingBoard(): void {
    if (this.existingBoard && this.existingBoard.columns) {
      this.columns.clear();
      this.existingBoard.columns.forEach((column) => {
        this.columns.push(
          this.fb.group({
            id: [column.id],
            name: [column.name, Validators.required],
          })
        );
      });
    }
  }

  addColumn(): void {
    this.columns.push(this.createColumn());
  }

  removeColumn(index: number): void {
    this.columns.removeAt(index);
  }

  generateBoardId(): string {
    return uuidv4();
  }

  onSubmit(): void {
    if (this.addBoardForm.valid) {
      const updatedBoard: Board = {
        id: this.existingBoard ? this.existingBoard.id : this.generateBoardId(),
        name: this.addBoardForm.value.boardName,
        columns: this.addBoardForm.value.columns.map((col: any) => {
          const existingColumn = this.existingBoard?.columns.find(
            (existingCol) => existingCol.id === col.id
          );

          return {
            id: col.id,
            name: col.name,
            tasks: existingColumn ? existingColumn.tasks : [],
          };
        }),
      };

      if (this.existingBoard) {
        this.store.dispatch(BoardActions.updateBoard({ board: updatedBoard }));
      } else {
        this.store.dispatch(BoardActions.addBoard({ board: updatedBoard }));
      }

      this.closeModal();
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
