import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-imagen',
  standalone: true,
  imports: [],
  templateUrl: './imagen.component.html',
  styleUrl: './imagen.component.css'
})
export class ImagenComponent {
  @Input() ImageId!: string;
  @Input() ImageUrl!: string;
  @Input() comments!: string[];
  
  @Output() addComment = new EventEmitter();
  @Output() deleteComment = new EventEmitter();
  @Output() viewComments = new EventEmitter();

  constructor(){}

  onAddComment(event: Event){
    this.addComment.emit(event)
    console.log(event);
  }
  onDelete() {
    this.deleteComment.emit()
  }
  onViewComments() {
    this.viewComments.emit()
  }


}

